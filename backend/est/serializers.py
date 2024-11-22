from rest_framework import serializers
from .models import Estudiante
from inscripciones.serializers import InscripcionSerializer
from apoderados.serializers import ApoderadoSerializer


class EstudianteSerializer(serializers.ModelSerializer):
    inscripciones = InscripcionSerializer(
        source="estudiante", many=True, read_only=True
    )
    apoderado_detalle = ApoderadoSerializer(read_only=True, source="apoderado")
    nombre_completo = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Estudiante
        fields = [
            "pk",
            "primer_nombre",
            "segundo_nombre",
            "tercer_nombre",
            "primer_apellido",
            "segundo_apellido",
            "rut",
            "fecha_nacimiento",
            "apoderado",
            "apoderado_detalle",
            "inscripciones",
            "nombre_completo",
        ]

    def get_nombre_completo(self, obj):
        segundo_nombre = obj.segundo_nombre + " " if obj.segundo_nombre else ""
        tercer_nombre = obj.tercer_nombre + " " if obj.tercer_nombre else ""
        return f"{obj.primer_nombre} {segundo_nombre}{tercer_nombre}{obj.primer_apellido} {obj.segundo_apellido}"


class EstudianteDetailSerializer(serializers.ModelSerializer):
    inscripciones = InscripcionSerializer(
        source="estudiante", many=True, read_only=True
    )
    apoderado = ApoderadoSerializer(read_only=True)
    nombre_completo = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Estudiante
        fields = [
            "pk",
            "primer_nombre",
            "segundo_nombre",
            "tercer_nombre",
            "primer_apellido",
            "segundo_apellido",
            "rut",
            "fecha_nacimiento",
            "apoderado",
            "inscripciones",
            "nombre_completo",
        ]

    def get_nombre_completo(self, obj):
        segundo_nombre = obj.segundo_nombre + " " if obj.segundo_nombre else ""
        tercer_nombre = obj.tercer_nombre + " " if obj.tercer_nombre else ""
        return f"{obj.primer_nombre} {segundo_nombre}{tercer_nombre}{obj.primer_apellido} {obj.segundo_apellido}"
