from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class Endereco(models.Model):
    cep = models.CharField(max_length=8)
    rua = models.CharField(max_length=100)
    numero = models.CharField(max_length=10)
    bairro = models.CharField(max_length=100)
    complemento = models.CharField(max_length=100, null=True, blank=True)
    uf = models.CharField(max_length=2)


class User(AbstractUser):
    name = models.CharField(max_length=255)
    endereco = models.OneToOneField(
        Endereco, on_delete=models.CASCADE,
        related_name='user',
        null=True, blank=True
    )
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Padaria(AbstractUser):
    nome_fantasia = models.CharField(max_length=255)
    endereco = models.OneToOneField(
        Endereco, on_delete=models.CASCADE,
        related_name='padaria',
        null=True, blank=True
    )
    cnpj = models.CharField(max_length=18, unique=True)
    telefone = models.CharField(max_length=20)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    groups = models.ManyToManyField(Group, related_name='padaria_groups', blank=True)  # noqa: E501
    user_permissions = models.ManyToManyField(Permission, related_name='padaria_permissions', blank=True)  # noqa: E501

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
