from rest_framework import generics
from rest_framework.exceptions import ValidationError
from .models import Inscripcion
from .serializers import InscripcionSerializer

# Create your views here.

from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
    OpenApiParameter,
    OpenApiExample,
)


@extend_schema_view(
    post=extend_schema(
        summary="Crear un registro de inscripción",
        description=(
            "Crea un nuevo registro de inscripción para un estudiante. "
            "Verifica que el estudiante NO tenga una inscripción activa, "
            "o si la última inscripción está impaga. "
            "Si no tiene una inscripción activa o el plan no ha sido pagado, "
            "lanza una excepción."
        ),
        responses={
            201: InscripcionSerializer,
            400: OpenApiExample(
                "Error",
                summary="Error en la creación de la inscripción.",
                description="Mensaje de error si el estudiante tiene inscripción activa o inscripción impaga.",
                value={"detail": "El estudiante tiene inscripción activa o impaga."},
            ),
        },
    ),
)
class InscripcionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer

    def perform_create(self, serializer):
        estudiante = self.request.data.get("estudiante")

        pendiente = Inscripcion.objects.filter(pagado=False, estudiante=estudiante)
        activa = Inscripcion.objects.filter(estudiante=estudiante)
        inscripciones_activas = [
            inscripcion for inscripcion in activa if inscripcion.activa
        ]
        if activa.last():
            est = activa.last().estudiante
            nombre_est = f"{est.primer_nombre} {est.segundo_nombre} {est.primer_apellido} {est.segundo_apellido}"
            if inscripciones_activas:
                print("inscripciones------------")
                raise ValidationError(
                    f"El estudiante {nombre_est} tiene cuentas activas."
                )

        # print(activa.last())
        if pendiente.exists():
            print("si")
            raise ValidationError(f"El estudiante {nombre_est} tiene cuentas no pagas.")
            return
        else:
            print("no hay pendientes")
            return super().perform_create(serializer)


class InscripcionDetailAPIView(generics.RetrieveAPIView):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer


class InscripcionUpdateAPIView(generics.UpdateAPIView):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer


class InscripcionDeleteAPIView(generics.DestroyAPIView):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer
