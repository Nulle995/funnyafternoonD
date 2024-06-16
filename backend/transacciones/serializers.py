from rest_framework import serializers
from .models import Transaccion


class TransaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaccion
        fields = [
            "fecha",
            "tipo_transaccion",
            "categoria",
            "monto",
            "desc",
            "apoderado",
            "evento",
            "creado_en",
            "actualizado_en",
        ]
        extra_kwargs = {
            "creado_en": {"read_only": True},
            "actualizado_en": {"read_only": True},
        }
