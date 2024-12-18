# Generated by Django 5.0.6 on 2024-12-10 19:34

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventos', '0002_alter_evento_monto'),
        ('transacciones', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaccion',
            name='evento',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transacciones', to='eventos.evento'),
        ),
        migrations.AlterField(
            model_name='transaccion',
            name='monto',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(999999999)]),
        ),
    ]
