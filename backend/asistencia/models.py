from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from inscripciones.models import Inscripcion


def get_current_date():
    print(timezone.now())
    return timezone.localtime().date()


# Create your models here.
class Asistencia(models.Model):
    inscripcion = models.ForeignKey(
        Inscripcion, on_delete=models.CASCADE, related_name="inscripcion"
    )
    fecha = models.DateField(default=get_current_date)

    def __str__(self):
        return f"{self.inscripcion.estudiante} - {self.fecha}"
