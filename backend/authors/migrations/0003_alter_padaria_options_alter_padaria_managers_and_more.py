# Generated by Django 4.2 on 2023-04-28 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0002_padaria'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='padaria',
            options={},
        ),
        migrations.AlterModelManagers(
            name='padaria',
            managers=[
            ],
        ),
        migrations.RemoveField(
            model_name='padaria',
            name='date_joined',
        ),
        migrations.RemoveField(
            model_name='padaria',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='padaria',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='padaria',
            name='is_staff',
        ),
        migrations.RemoveField(
            model_name='padaria',
            name='is_superuser',
        ),
        migrations.RemoveField(
            model_name='padaria',
            name='last_login',
        ),
        migrations.RemoveField(
            model_name='padaria',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='padaria',
            name='username',
        ),
        migrations.AlterField(
            model_name='padaria',
            name='cnpj',
            field=models.CharField(max_length=18, unique=True),
        ),
    ]
