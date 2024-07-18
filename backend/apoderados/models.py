from django.db import models


# Create your models here.
class Apoderado(models.Model):
    primer_nombre = models.CharField(max_length=30)
    segundo_nombre = models.CharField(max_length=30)
    tercer_nombre = models.CharField(max_length=30, blank=True, null=True)
    primer_apellido = models.CharField(max_length=30)
    segundo_apellido = models.CharField(max_length=30)
    rut = models.CharField(max_length=30, unique=True)
    telefono = models.CharField(max_length=12, unique=True)
    email = models.EmailField(unique=True)
    fecha_nacimiento = models.DateField()

    def __str__(self):
        return f"{self.primer_nombre} {self.segundo_nombre} {self.tercer_nombre or ''} {self.primer_apellido} {self.segundo_apellido}"
