from django.db import models
from django.utils import timezone
from datetime import timedelta
from planes.models import Plan
from est.models import Estudiante


# Create your models here.
class Inscripcion(models.Model):
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name="plan")
    estudiante = models.ForeignKey(
        Estudiante, on_delete=models.CASCADE, related_name="estudiante"
    )
    fecha_inicio = models.DateField(default=timezone.now)
    fecha_fin = models.DateField(null=True, blank=True)
    dias_asistidos = models.IntegerField(default=0)
    pagado = models.BooleanField(default=False)

    def marcar_dia_asistido(self):
        self.dias_asistidos += 1
        if self.dias_asistidos >= self.plan.duracion_dias:
            self.fecha_fin = self.fecha_inicio + timedelta(days=self.dias_asistidos - 1)

    @property
    def activa(self):
        return self.fecha_fin is None or self.fecha_fin >= timezone.localtime().date()

    def __str__(self):
        return f"{self.estudiante} - {self.plan} desde {self.fecha_inicio} hasta {self.fecha_fin or '--'}"
