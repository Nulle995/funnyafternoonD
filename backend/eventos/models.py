from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.
class Evento(models.Model):
    nombre = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    cliente = models.CharField(max_length=255)
    desc = models.TextField(null=True, blank=True)
    monto = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(999999999)]
    )
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nombre} - {self.cliente}"
