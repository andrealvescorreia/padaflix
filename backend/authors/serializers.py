from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import User, Padaria, Endereco, PlanoAssinatura, Assinatura
from .validators import validate_cnpj, validate_telefone, validate_email, validate_password  # noqa: E501


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = ['cep', 'rua', 'numero', 'bairro', 'complemento', 'uf']


class PlanoAssinaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanoAssinatura
        fields = ['id', 'nome', 'descricao', 'preco', 'pessoas_servidas']

    def is_valid(self):
        if not self.initial_data:
            raise ValidationError(
                "É necessário fornecer dados válidos para criar um plano de assinatura."  # noqa: E501
            )

        return super().is_valid()


class AssinaturaSerializer(serializers.ModelSerializer):
    cliente = serializers.PrimaryKeyRelatedField(read_only=True)
    cliente_nome = serializers.CharField(source='cliente.nome', read_only=True)
    plano = serializers.PrimaryKeyRelatedField(queryset=PlanoAssinatura.objects.all())  # noqa: E501

    class Meta:
        model = Assinatura
        fields = ['id', 'cliente', 'cliente_nome', 'plano',
                  'data_inicio', 'data_fim', 'assinado']


class UserSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer()
    assinatura = AssinaturaSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'nome', 'endereco', 'email', 'password', 'assinatura']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        endereco_data = validated_data.pop('endereco')
        endereco = Endereco.objects.create(**endereco_data)

        password = validated_data.get('password', None)
        instance = self.Meta.model(**validated_data, endereco=endereco)
        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

    def validate_email(self, value):
        validate_email(value)
        return value

    def validate_password(self, value):
        validate_password(value)
        return value


class PadariaSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer()
    plano_assinatura = PlanoAssinaturaSerializer(many=True, read_only=True)

    class Meta:
        model = Padaria
        fields = ['id', 'nome_fantasia', 'endereco', 'cnpj',
                  'telefone', 'email', 'password', 'plano_assinatura']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        endereco_data = validated_data.pop('endereco')
        endereco = Endereco.objects.create(**endereco_data)

        password = validated_data.get('password', None)
        instance = self.Meta.model(
            **validated_data,
            endereco=endereco,
        )
        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

    def validate_email(self, value):
        validate_email(value)
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def validate_cnpj(self, value):
        validate_cnpj(value)
        return value

    def validate_telefone(self, value):
        validate_telefone(value)
        return value
