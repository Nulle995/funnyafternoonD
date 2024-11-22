from django.test import TestCase
from .models import Apoderado

# Create your tests here.

Nombre1 = "Damián"
Nombre2 = "Alejandro"
Nombre3 = ""
Apellido1 = "Piña"
Apellido2 = "Pinto"
Rut_apo = "12345678-9"
Telefono_apo = "987654321"
Email_apo = "damian@example.com"
Fecha_nacimiento_apo = "2000-01-01"


class ApoderadoTest(TestCase):
    def setUp(self):
        Apoderado.objects.create(
            primer_nombre=Nombre1,
            segundo_nombre=Nombre2,
            tercer_nombre=Nombre3,
            primer_apellido=Apellido1,
            segundo_apellido=Apellido2,
            rut=Rut_apo,
            telefono=Telefono_apo,
            email=Email_apo,
            fecha_nacimiento=Fecha_nacimiento_apo,
        )

    def test_apoderado_creation(self):
        apoderado = Apoderado.objects.get(primer_nombre=Nombre1)
        self.assertEqual(apoderado.segundo_nombre, Nombre2)
        self.assertEqual(apoderado.tercer_nombre, Nombre3)
        self.assertEqual(apoderado.primer_apellido, Apellido1)
        self.assertEqual(apoderado.segundo_apellido, Apellido2)
        self.assertEqual(apoderado.rut, Rut_apo)
        self.assertEqual(apoderado.telefono, Telefono_apo)
        self.assertEqual(apoderado.email, Email_apo)
        self.assertEqual(
            apoderado.fecha_nacimiento.strftime("%Y-%m-%d"), Fecha_nacimiento_apo
        )

    def test_apoderado_str(self):
        apoderado = Apoderado.objects.get(primer_nombre=Nombre1)
        expected_str = f"{Nombre1} {Nombre2} {Nombre3} {Apellido1} {Apellido2}".strip()
        self.assertEqual(str(apoderado), expected_str)


class ApoderadoDatosRepetidosTest(TestCase):
    def setUp(self):
        Apoderado.objects.create(
            primer_nombre="Dylan",
            segundo_nombre="Leonardo",
            tercer_nombre="Juan",
            primer_apellido="Paredes",
            segundo_apellido="Paredes",
            rut="12345678-9",
            telefono="987654321",
            email="Dylan@example.com",
            fecha_nacimiento="2000-01-01",
        )

    def test_apoderado_creation(self):

        Apoderado.objects.create(
            primer_nombre="María",
            segundo_nombre="Luisa",
            tercer_nombre="Fernanda",
            primer_apellido="González",
            segundo_apellido="Martínez",
            rut="12345678-9",
            telefono="987654321",
            email="maria@example.com",
            fecha_nacimiento="1995-05-05",
        )
