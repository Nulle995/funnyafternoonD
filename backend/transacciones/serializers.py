from rest_framework import serializers
from .models import Transaccion
from apoderados.models import Apoderado
from eventos.models import Evento


class ApoderadoTransaccionSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Apoderado
        fields = ["nombre_completo"]

    def get_nombre_completo(self, obj):
        segundo_nombre = obj.segundo_nombre + " " if obj.segundo_nombre else ""
        tercer_nombre = obj.tercer_nombre + " " if obj.tercer_nombre else ""
        return f"{obj.primer_nombre} {segundo_nombre}{tercer_nombre}{obj.primer_apellido} {obj.segundo_apellido}"


class EventoTransaccionSerializer(serializers.ModelSerializer):
    nombre = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Evento
        fields = ["nombre"]

    def get_nombre(self, obj):
        return obj.nombre


class TransaccionSerializer(serializers.ModelSerializer):
    apoderado_desc = ApoderadoTransaccionSerializer(read_only=True)
    evento_desc = EventoTransaccionSerializer(read_only=True)

    class Meta:
        model = Transaccion
        fields = [
            "pk",
            "fecha",
            "tipo_transaccion",
            "categoria",
            "monto",
            "desc",
            "apoderado",
            "apoderado_desc",
            "evento",
            "evento_desc",
            "creado_en",
            "actualizado_en",
        ]
        extra_kwargs = {
            "creado_en": {"read_only": True},
            "actualizado_en": {"read_only": True},
        }
