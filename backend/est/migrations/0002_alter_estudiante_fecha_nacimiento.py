# Generated by Django 5.0.6 on 2024-05-17 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('est', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estudiante',
            name='fecha_nacimiento',
            field=models.DateField(),
        ),
    ]
