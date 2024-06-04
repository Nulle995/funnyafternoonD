from django.db import models
from apoderados.models import Apoderado


# Create your models here.
class Estudiante(models.Model):
    primer_nombre = models.CharField(max_length=30)
    segundo_nombre = models.CharField(max_length=30)
    tercer_nombre = models.CharField(max_length=30, blank=True, null=True)
    primer_apellido = models.CharField(max_length=40)
    segundo_apellido = models.CharField(max_length=40)
    rut = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField()
    apoderado = models.ForeignKey(
        Apoderado, on_delete=models.CASCADE, related_name="estudiantes"
    )

    def __str__(self):
        return f"{self.primer_nombre} {self.segundo_nombre} {self.tercer_nombre or ''} {self.primer_apellido} {self.segundo_apellido}"

    def ultima_inscripcion_activa(self):
        return (
            self.inscripciones.filter(fecha_fin__insull=True)
            .order_by("-fecha_inicio")
            .first()
        )
