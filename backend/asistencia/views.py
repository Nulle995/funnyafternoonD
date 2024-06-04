from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.exceptions import ValidationError
from django.utils import timezone
from .models import Asistencia
from .serializers import AsistenciaSerializer
from inscripciones.models import Inscripcion


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
