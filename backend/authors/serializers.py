from rest_framework import serializers
from .models import User, Padaria, Endereco


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = ['cep', 'rua', 'numero', 'bairro', 'complemento', 'uf']


class UserSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer()

    class Meta:
        model = User
        fields = ['id', 'name', 'endereco', 'email', 'password']
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


class PadariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Padaria
        fields = ['id', 'nome_fantasia', 'endereco',
                  'cnpj', 'telefone', 'email', 'password']
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
