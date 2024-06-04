from django.db import models


# Create your models here.
class Plan(models.Model):
    DIARIO = "D"
    SEMANAL = "S"
    MENSUAL = "M"

    TIPO_PLAN_CHOICES = [
        (DIARIO, "Diario"),
        (SEMANAL, "Semanal"),
        (MENSUAL, "Mensual"),
    ]

    tipo = models.CharField(max_length=1, choices=TIPO_PLAN_CHOICES)
    descripcion = models.CharField(max_length=50)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    duracion_dias = models.IntegerField()

    def __str__(self):
        return self.get_tipo_display()
