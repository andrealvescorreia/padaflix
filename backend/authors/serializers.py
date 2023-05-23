from rest_framework import serializers
from .models import User, Padaria, Endereco, PlanoAssinatura, Assinatura


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = ['cep', 'rua', 'numero', 'bairro', 'complemento', 'uf']


class PlanoAssinaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanoAssinatura
        fields = ['nome', 'descricao', 'preco', 'servings_unit']


class AssinaturaSerializer(serializers.ModelSerializer):
    cliente = serializers.PrimaryKeyRelatedField(read_only=True)
    cliente_nome = serializers.CharField(source='cliente.name', read_only=True)
    plano = PlanoAssinaturaSerializer()

    class Meta:
        model = Assinatura
        fields = ['id', 'cliente', 'cliente_nome',
                  'plano', 'data_inicio', 'data_fim']


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
    endereco = EnderecoSerializer()
    plano_assinatura = PlanoAssinaturaSerializer(many=True, read_only=True)

    class Meta:
        model = Padaria
        fields = ['id', 'nome_fantasia', 'endereco',
                  'cnpj', 'telefone', 'email', 'password', 'plano_assinatura']
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
