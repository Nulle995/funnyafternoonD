from rest_framework import serializers
from .models import Asistencia


class AsistenciaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Asistencia
        fields = [
            "pk",
            "inscripcion",
            "fecha",
        ]
        extra_kwargs = {"inscripcion": {"read_only": True}}
