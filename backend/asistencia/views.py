from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.exceptions import ValidationError
from django.utils import timezone
from .models import Asistencia
from .serializers import AsistenciaSerializer
from inscripciones.models import Inscripcion
from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
    OpenApiParameter,
    OpenApiExample,
)


@extend_schema_view(
    post=extend_schema(
        summary="Crear un registro de asistencia",
        description=(
            "Crea un nuevo registro de asistencia para un estudiante. "
            "Verifica que el estudiante tenga una inscripción activa. "
            "Si no tiene una inscripción activa o el plan ha terminado, "
            "lanza una excepción."
        ),
        parameters=[
            OpenApiParameter(
                name="estudiante",
                description="ID del estudiante para el cual se crea el registro de asistencia",
                required=True,
                type=int,
                location=OpenApiParameter.QUERY,
                examples=[
                    OpenApiExample(
                        "Ejemplo de ID de estudiante",
                        summary="ID de estudiante",
                        value=1,
                    )
                ],
            )
        ],
        responses={
            201: AsistenciaSerializer,
            400: OpenApiExample(
                "Error",
                summary="Error en la creación de la asistencia",
                description="Mensaje de error si el estudiante no tiene inscripción activa o el plan ha terminado.",
                value={"detail": "No hay inscripción activa para este estudiante."},
            ),
        },
    ),
    get=extend_schema(
        summary="Listar registros de asistencia",
        description="Obtiene una lista de todos los registros de asistencia.",
        responses={200: AsistenciaSerializer(many=True)},
    ),
)

# Create your views here.
class AsistenciaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Asistencia.objects.all()
    serializer_class = AsistenciaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        id_estudiante = self.request.data.get("estudiante")
        ultima_inscripcion_activa = (
            Inscripcion.objects.filter(estudiante=id_estudiante, fecha_fin__isnull=True)
            .order_by("-fecha_inicio")
            .first()
        )
        if not ultima_inscripcion_activa:
            raise ValidationError("No hay inscripción activa para este estudiante.")

        if ultima_inscripcion_activa.fecha_fin is not None:
            raise ValidationError("El plan ya ha terminado.")

        serializer.save(inscripcion=ultima_inscripcion_activa)
        ultima_inscripcion_activa.dias_asistidos += 1
        if (
            ultima_inscripcion_activa.dias_asistidos
            >= ultima_inscripcion_activa.plan.duracion_dias
        ):
            ultima_inscripcion_activa.fecha_fin = (
                ultima_inscripcion_activa.fecha_inicio
                + timezone.timedelta(days=ultima_inscripcion_activa.dias_asistidos - 1)
            )
        ultima_inscripcion_activa.save()


class AsistenciaDetailAPIView(generics.RetrieveAPIView):
    queryset = Asistencia.objects.all()
    serializer_class = AsistenciaSerializer


class AsistenciaUpdateAPIView(generics.UpdateAPIView):
    queryset = Asistencia.objects.all()
    serializer_class = AsistenciaSerializer


class AsistenciaDeleteAPIView(generics.DestroyAPIView):
    queryset = Asistencia.objects.all()
    serializer_class = AsistenciaSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        inscripcion = instance.inscripcion
        inscripcion.dias_asistidos -= 1
        inscripcion.save()
        return super().destroy(request, *args, **kwargs)
