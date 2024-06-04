from rest_framework import serializers
from .models import Inscripcion
from asistencia.serializers import AsistenciaSerializer
from planes.serializers import PlanSerializer


class InscripcionSerializer(serializers.ModelSerializer):
    asistencias = AsistenciaSerializer(source="inscripcion", many=True, read_only=True)
    plan_detalle = PlanSerializer(read_only=True, source="plan")

    class Meta:
        model = Inscripcion
        fields = [
            "pk",
            "plan",
            "plan_detalle",
            "activa",
            "estudiante",
            "fecha_inicio",
            "fecha_fin",
            "dias_asistidos",
            "pagado",
            "asistencias",
        ]
