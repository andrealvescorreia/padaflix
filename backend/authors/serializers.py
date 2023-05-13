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

    def validate(self, data):
        endereco = data.get('endereco', {})

        '''queryset = User.objects.filter(
            endereco__cep=endereco.get('cep', ''),
            endereco__rua=endereco.get('rua', ''),
            endereco__numero=endereco.get('numero', ''),
            endereco__bairro=endereco.get('bairro', ''),
            endereco__complemento=endereco.get('complemento', ''),
            endereco__uf=endereco.get('uf', ''),
        )
        if queryset.exists():
            raise serializers.ValidationError(
                "Já existe um usuário cadastrado com o mesmo endereço."
            )'''

        queryset = Padaria.objects.filter(
            endereco__cep=endereco.get('cep', ''),
            endereco__rua=endereco.get('rua', ''),
            endereco__numero=endereco.get('numero', ''),
            endereco__bairro=endereco.get('bairro', ''),
            endereco__complemento=endereco.get('complemento', ''),
            endereco__uf=endereco.get('uf', ''),
        )
        if queryset.exists():
            raise serializers.ValidationError(
                "Já existe uma padaria cadastrada com o mesmo endereço."
            )

        return data


class PadariaSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer()

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

    def validate(self, data):
        endereco = data.get('endereco', {})

        queryset = Padaria.objects.filter(
            endereco__cep=endereco.get('cep', ''),
            endereco__rua=endereco.get('rua', ''),
            endereco__numero=endereco.get('numero', ''),
            endereco__bairro=endereco.get('bairro', ''),
            endereco__complemento=endereco.get('complemento', ''),
            endereco__uf=endereco.get('uf', ''),
        )
        if queryset.exists():
            raise serializers.ValidationError(
                "Já existe uma padaria cadastrada com o mesmo endereço."
            )

        queryset = User.objects.filter(
            endereco__cep=endereco.get('cep', ''),
            endereco__rua=endereco.get('rua', ''),
            endereco__numero=endereco.get('numero', ''),
            endereco__bairro=endereco.get('bairro', ''),
            endereco__complemento=endereco.get('complemento', ''),
            endereco__uf=endereco.get('uf', ''),
        )
        if queryset.exists():
            raise serializers.ValidationError(
                "Já existe um usuário cadastrado com o mesmo endereço."
            )

        return data
