import requests
import jwt
import datetime

from .serializers import (
    UserSerializer, PadariaSerializer,
    PlanoAssinaturaSerializer, AssinaturaSerializer, EnderecoSerializer
)
from .models import User, Padaria, PlanoAssinatura, Assinatura
from django.db.models import Value, CharField
from django.db.models.functions import Concat
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework import status


def home(request):
    padarias = Padaria.objects.all()
    data = {'padarias': []}
    for padaria in padarias:
        data['padarias'].append({
            'nome_fantasia': padaria.nome_fantasia,
            'endereco': {
                'cep': padaria.endereco.cep,
                'rua': padaria.endereco.rua,
                'numero': padaria.endereco.numero,
                'bairro': padaria.endereco.bairro,
                'complemento': padaria.endereco.complemento,
                'uf': padaria.endereco.uf,
            },
            'cnpj': padaria.cnpj,
            'telefone': padaria.telefone,
        })
    return JsonResponse(data)


class Register_UserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        email = request.GET.get('email')
        if email:
            if User.objects.filter(email=email).exists() or Padaria.objects.filter(email=email).exists():  # noqa: E501
                return Response(
                    {'error': 'O e-mail já está em uso.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(status=status.HTTP_204_NO_CONTENT)


class Register_PadariaView(APIView):
    def post(self, request):
        serializer = PadariaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        email = request.GET.get('email')
        if email:
            if User.objects.filter(email=email).exists() or Padaria.objects.filter(email=email).exists():  # noqa: E501
                return Response(
                    {'error': 'O e-mail já está em uso.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(status=status.HTTP_204_NO_CONTENT)


class LoginView(APIView):
    def post(self, request):
        data = request.data
        email = data['email']
        password = data['password']

        user = User.objects.filter(email=email).first()

        if user is None:

            padaria = Padaria.objects.filter(email=email).first()

            if padaria is None:
                return Response(
                    {'error': 'Email e/ou senha invalidos'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            if not padaria.check_password(password):
                return Response(
                    {'error': 'Email e/ou senha invalidos'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            payload = {
                'user-type': 'padaria-user',
                'id': padaria.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=360),  # noqa: E501
                'iat': datetime.datetime.utcnow()
            }

        else:
            if not user.check_password(password):
                return Response(
                    {'error': 'Email e/ou senha invalidos'},
                    status=status.HTTP_401_UNAUTHORIZED
                    )

            payload = {
                'user-type': 'client-user',
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=360),  # noqa: E501
                'iat': datetime.datetime.utcnow()
            }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True, samesite='None', secure=True)
        response.data = {
            "jwt": token
        }
        return response


class UserAndPadariaView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        
        print('jwt: ', token)
        csrftoken = request.COOKIES.get('csrftoken')
        print('csrftoken: ', csrftoken)

        if not token:
            raise AuthenticationFailed('Não Autenticado!')

        try:
            payload = jwt.decode(token, 'secret', algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Não Autenticado!')
        except jwt.DecodeError:
            raise AuthenticationFailed('Token inválido!')

        if payload['user-type'] == 'client-user':
            user = User.objects.filter(id=payload['id']).first()
            serializer = UserSerializer(user)
        elif payload['user-type'] == 'padaria-user':
            padaria = Padaria.objects.filter(id=payload['id']).first()
            serializer = PadariaSerializer(padaria)
        else:
            raise AuthenticationFailed('Tipo de usuário inválido!')

        return Response(serializer.data)


class PadariaDetailsView(APIView):
    def get(self, request, pk):
        padaria = Padaria.objects.filter(pk=pk).first()
        if not padaria:
            return Response(
                {'error': 'Padaria não encontrada.'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = PadariaSerializer(padaria)
        return Response(serializer.data)


class PadariaPorCidadeView(APIView):
    def get(self, request, cep):
        response = requests.get(f'https://viacep.com.br/ws/{cep}/json/')
        if response.status_code != status.HTTP_200_OK:
            return JsonResponse(
                {'message': 'CEP inválido.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if "erro" in response.json() and response.json()["erro"]:
            return JsonResponse(
                {'message': 'CEP não encontrado.'},
                status=status.HTTP_404_NOT_FOUND
            )

        cidade = response.json().get('localidade', '').upper()
        padarias = (
            Padaria.objects
            .filter(endereco__cep__startswith=cep[:4])
            .annotate(cidade=Value(cidade, output_field=CharField()))
            .annotate(nome_com_cidade=Concat('nome_fantasia', Value(' - '), 'cidade'))  # noqa: E501
            .filter(cidade=cidade)
        )

        serializer = PadariaSerializer(padarias, many=True)
        return JsonResponse(serializer.data, safe=False)


class PlanoAssinaturaView(UserAndPadariaView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get('jwt')
        if not token:
            return Response(
                {'error': 'Acesso negado.'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            payload = jwt.decode(token, 'secret', algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Não Autenticado!')
        except jwt.DecodeError:
            raise AuthenticationFailed('Token inválido!')

        if payload['user-type'] != 'padaria-user':
            return Response(
                {'error': 'Acesso negado.'},
                status=status.HTTP_403_FORBIDDEN
            )

        padaria_id = payload['id']
        padaria = Padaria.objects.get(id=padaria_id)

        serializer = PlanoAssinaturaSerializer(data=request.data)
        if serializer.is_valid():
            plano_assinatura = serializer.save()
            padaria.plano_assinatura.add(plano_assinatura)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, padaria_id):
        if not padaria_id:
            return Response(
                {'error': 'É necessário fornecer o ID da padaria.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            padaria = Padaria.objects.get(id=padaria_id)
        except Padaria.DoesNotExist:
            return Response(
                {'error': 'Padaria não encontrada.'},
                status=status.HTTP_404_NOT_FOUND
            )

        planos = PlanoAssinatura.objects.filter(padaria_planos=padaria)
        serializer = PlanoAssinaturaSerializer(planos, many=True)
        return Response(serializer.data)


class AssinantesView(UserAndPadariaView):
    def get(self, request, padaria_id):
        if not padaria_id:
            return Response(
                {'error': 'É necessário fornecer o ID da padaria.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            padaria = Padaria.objects.get(id=padaria_id)
        except Padaria.DoesNotExist:
            return Response(
                {'error': 'Padaria não encontrada.'},
                status=status.HTTP_404_NOT_FOUND
            )

        planos = PlanoAssinatura.objects.filter(padaria_planos=padaria)
        serializer = PlanoAssinaturaSerializer(planos, many=True)
        planos_data = serializer.data

        for plano_data in planos_data:
            plano_id = plano_data['id']
            assinaturas = Assinatura.objects.filter(plano_id=plano_id)
            assinaturas_serializer = AssinaturaSerializer(assinaturas, many=True)  # noqa: E501

            for assinatura_data in assinaturas_serializer.data:
                cliente_id = assinatura_data['cliente']
                cliente = User.objects.get(id=cliente_id)
                endereco_cliente = EnderecoSerializer(cliente.endereco).data
                assinatura_data['endereco_cliente'] = endereco_cliente

            plano_data['assinaturas'] = assinaturas_serializer.data

        return Response(planos_data)


class AssinaturaView(UserAndPadariaView):
    def post(self, request):
        cliente_id = request.data.get('cliente')
        plano_id = request.data.get('plano')

        try:
            cliente = User.objects.get(id=cliente_id)
            plano = PlanoAssinatura.objects.get(id=plano_id)
        except (User.DoesNotExist, PlanoAssinatura.DoesNotExist):
            return Response(
                {'error': 'Cliente ou plano de assinatura inválido.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = AssinaturaSerializer(data=request.data)
        if serializer.is_valid():
            assinatura = serializer.save(cliente=cliente, plano=plano)
            cliente.assinatura.add(assinatura)
            return JsonResponse(
                {'message': 'Assinatura criada com sucesso.'},
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

    def get(self, request, user_id):
        if not user_id:
            return Response(
                {'error': 'É necessário fornecer o ID do usuário.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {'error': 'Usuário não encontrado.'},
                status=status.HTTP_404_NOT_FOUND
            )

        assinaturas = Assinatura.objects.filter(cliente=user)
        serializer = AssinaturaSerializer(assinaturas, many=True)

        plano_data = serializer.data
        for item in plano_data:
            plano_id = item['plano']
            padaria_id = PlanoAssinatura.objects.get(id=plano_id).padaria_planos.first().id  # noqa: E501
            item['nome_plano'] = PlanoAssinatura.objects.get(id=plano_id).nome
            item['id_padaria'] = padaria_id
            item['nome_padaria'] = Padaria.objects.get(id=padaria_id).nome_fantasia  # noqa: E501

        return Response(plano_data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie(key='jwt', samesite='None')
        response.data = {
            'message': 'Logout feito com sucesso'
        }
        return response
