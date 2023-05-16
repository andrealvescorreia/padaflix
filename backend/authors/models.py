from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class Endereco(models.Model):
    cep = models.CharField(max_length=8)
    rua = models.CharField(max_length=100)
    numero = models.CharField(max_length=10)
    bairro = models.CharField(max_length=100)
    complemento = models.CharField(max_length=100, null=True, blank=True)
    uf = models.CharField(max_length=2)


class PlanoAssinatura(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=8, decimal_places=2)
    servings_unit = models.IntegerField()

    def __str__(self):
        return self.nome


class Assinatura(models.Model):
    cliente = models.ForeignKey(
        'User', on_delete=models.CASCADE,
        related_name='assinaturas'
    )
    plano = models.ForeignKey(PlanoAssinatura, on_delete=models.CASCADE)
    data_inicio = models.DateField()
    data_fim = models.DateField()

    def __str__(self):
        return f"{self.cliente} - {self.plano}"


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

    assinatura = models.ForeignKey(
        Assinatura, on_delete=models.SET_NULL,
        null=True, blank=True
    )

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
    groups = models.ManyToManyField(
        Group, related_name='padaria_groups', blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission, related_name='padaria_permissions', blank=True
    )

    plano_assinatura = models.ForeignKey(
        PlanoAssinatura, on_delete=models.SET_NULL,
        null=True, blank=True
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
