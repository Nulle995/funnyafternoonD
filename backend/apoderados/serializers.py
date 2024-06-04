from rest_framework import serializers
from .models import Apoderado
from est.models import Estudiante
from inscripciones.serializers import InscripcionSerializer


class EstudianteApoderadoSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.SerializerMethodField(read_only=True)
    inscripciones = InscripcionSerializer(
        source="estudiante", read_only=True, many=True
    )

    class Meta:
        model = Estudiante
        fields = [
            "pk",
            "nombre_completo",
            "inscripciones",
        ]

    def get_nombre_completo(self, obj):
        segundo_nombre = obj.segundo_nombre + " " if obj.segundo_nombre else ""
        tercer_nombre = obj.tercer_nombre + " " if obj.tercer_nombre else ""
        return f"{obj.primer_nombre} {segundo_nombre}{tercer_nombre}{obj.primer_apellido} {obj.segundo_apellido}"


class ApoderadoSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.SerializerMethodField(read_only=True)
    estudiantes = EstudianteApoderadoSerializer(read_only=True, many=True)

    class Meta:
        model = Apoderado
        fields = [
            "pk",
            "primer_nombre",
            "segundo_nombre",
            "tercer_nombre",
            "primer_apellido",
            "segundo_apellido",
            "nombre_completo",
            "rut",
            "telefono",
            "email",
            "fecha_nacimiento",
            "estudiantes",
        ]

    def get_nombre_completo(self, obj):
        segundo_nombre = obj.segundo_nombre + " " if obj.segundo_nombre else ""
        tercer_nombre = obj.tercer_nombre + " " if obj.tercer_nombre else ""
        return f"{obj.primer_nombre} {segundo_nombre}{tercer_nombre}{obj.primer_apellido} {obj.segundo_apellido}"
