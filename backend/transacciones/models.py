from django.db import models
from apoderados.models import Apoderado


# Create your models here.
class Transaccion(models.Model):
    fecha = models.DateField()
    titulo = models.CharField(max_length=100)
    desc = models.CharField(max_length=200, blank=True, null=True)
    precio = models.DecimalField(max_digits=30, decimal_places=2)
    apoderado = models.ForeignKey(
        Apoderado, on_delete=models.SET_NULL, blank=True, null=True
    )
    legal = models.CharField(max_length=200, blank=True, null=True)
    evento = models.BooleanField()
