# Generated by Django 5.0.6 on 2024-12-10 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('est', '0002_alter_estudiante_fecha_nacimiento'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estudiante',
            name='rut',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]