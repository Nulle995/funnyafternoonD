from rest_framework import serializers
from .models import Plan


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = [
            "tipo",
            "descripcion",
            "precio",
            "duracion_dias",
        ]
