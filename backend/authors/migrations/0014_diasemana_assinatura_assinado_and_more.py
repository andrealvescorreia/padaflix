# Generated by Django 4.2 on 2023-06-05 11:32

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0013_merge_20230530_0848'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiaSemana',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=20)),
            ],
        ),
        migrations.AddField(
            model_name='assinatura',
            name='assinado',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='assinatura',
            name='horario_entrega',
            field=models.TimeField(default=datetime.time(0, 0)),
        ),
        migrations.AlterField(
            model_name='assinatura',
            name='data_fim',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='assinatura',
            name='data_inicio',
            field=models.DateField(null=True),
        ),
        migrations.RemoveField(
            model_name='user',
            name='assinatura',
        ),
        migrations.AddField(
            model_name='assinatura',
            name='dias_semana',
            field=models.ManyToManyField(blank=True, to='authors.diasemana'),
        ),
        migrations.AddField(
            model_name='user',
            name='assinatura',
            field=models.ManyToManyField(blank=True, related_name='user', to='authors.assinatura'),
        ),
    ]
