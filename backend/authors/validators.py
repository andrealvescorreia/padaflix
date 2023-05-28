import re

from django.core.exceptions import ValidationError
from django.core.validators import validate_email as django_validate_email


def validate_email(value):
    try:
        django_validate_email(value)
    except ValidationError:
        raise ValidationError('Email inválido.')


def validate_password(password):
    if len(password) < 8 or not any(char.isdigit() for char in password) or not any(char.isupper() for char in password):  # noqa: E501
        raise ValidationError('A senha deve ter no mínimo 8 caracteres com pelo menos uma letra maiúscula e um número.')  # noqa: E501


def validate_cnpj(cnpj):
    cnpj_form = r'^\d{14}$'
    if not re.match(cnpj_form, cnpj):
        raise ValidationError('CNPJ inválido.')


def validate_telefone(telefone):
    telefone_form = r'^\d{11}$'
    if not re.match(telefone_form, telefone):
        raise ValidationError('Telefone inválido.')
