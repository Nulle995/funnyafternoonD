from django.db import models
from apoderados.models import Apoderado
from eventos.models import Evento


# Create your models here.
class Transaccion(models.Model):
    INGRESO = "Ingreso"
    EGRESO = "Egreso"
    TIPO_TRANSACCION_CHOICES = [
        (INGRESO, "Ingreso"),
        (EGRESO, "Egreso"),
    ]

    PAGO_PLAN = "Pago de Plan"
    SERVICIO = "Servicio"
    UTENSILIOS = "Utensilios"
    ARRIENDO_LOCAL = "Arriendo Local"
    CATEGORIA_CHOICES = [
        (PAGO_PLAN, "Pago de Plan"),
        (SERVICIO, "Serivicio"),
        (UTENSILIOS, "Utensilios"),
        (ARRIENDO_LOCAL, "Arriendo Local"),
    ]

    fecha = models.DateField()
    tipo_transaccion = models.CharField(max_length=8, choices=TIPO_TRANSACCION_CHOICES)
    categoria = models.CharField(max_length=16, choices=CATEGORIA_CHOICES)
    monto = models.DecimalField(max_digits=30, decimal_places=2)
    desc = models.CharField(max_length=200, blank=True, null=True)
    apoderado = models.ForeignKey(
        Apoderado, on_delete=models.CASCADE, blank=True, null=True
    )
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE, null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.tipo_transaccion} - {self.categoria} - ${self.monto}"
