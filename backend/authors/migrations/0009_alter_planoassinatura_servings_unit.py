# Generated by Django 4.2 on 2023-05-16 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0008_planoassinatura_assinatura_padaria_plano_assinatura_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='planoassinatura',
            name='servings_unit',
            field=models.IntegerField(),
        ),
    ]