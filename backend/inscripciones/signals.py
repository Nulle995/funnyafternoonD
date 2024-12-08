from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import date
from .models import Inscripcion
from transacciones.models import Transaccion


@receiver(post_save, sender=Inscripcion)
def crear_transaccion_si_pagado(sender, instance, created, **kwargs):

    if not created:
        if instance.pagado:
            Transaccion.objects.create(
                monto=instance.plan.precio,
                apoderado=instance.estudiante.apoderado,
                fecha=date.today(),
                tipo_transaccion="Ingreso",
                categoria="Pago de Plan",
                desc=f"Pago registrado para {instance.estudiante}",
            )
