from rest_framework import serializers
from .models import Evento


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = [
            "pk",
            "nombre",
            "fecha_inicio",
            "fecha_fin",
            "cliente",
            "desc",
            "monto",
            "creado_en",
            "actualizado_en",
            "transacciones",
        ]
        extra_kwargs = {
            "creado_en": {"read_only": True},
            "actualizado_en": {"read_only": True},
        }
