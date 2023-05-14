import requests
import jwt
import datetime

from .serializers import UserSerializer, PadariaSerializer
from .models import User, Padaria
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
            # serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Register_PadariaView(APIView):
    def post(self, request):
        serializer = PadariaSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        data = request.data
        email = data['email']
        password = data['password']

        user = User.objects.filter(email=email).first()

        if user is None:

            padaria = Padaria.objects.filter(email=email).first()

            if padaria is None:
                return Response({'error': 'Email e/ou senha invalidos'}, status=status.HTTP_401_UNAUTHORIZED)  # noqa: E501

            if not padaria.check_password(password):
                return Response({'error': 'Email e/ou senha invalidos'}, status=status.HTTP_401_UNAUTHORIZED)  # noqa: E501

            payload = {
                'user-type': 'padaria-user',
                'id': padaria.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=360),  # noqa: E501
                'iat': datetime.datetime.utcnow()
            }

        else:
            if not user.check_password(password):
                return Response({'error': 'Email e/ou senha invalidos'}, status=status.HTTP_401_UNAUTHORIZED)  # noqa: E501

            payload = {
                'user-type': 'client-user',
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=360),  # noqa: E501
                'iat': datetime.datetime.utcnow()
            }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            "jwt": token
        }
        return response


class UserAndPadariaView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Não Autenticado!')

        try:
            payload = jwt.decode(token, 'secret', algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Não Autenticado!')

        if payload['user-type'] == 'client-user':
            user = User.objects.filter(id=payload['id']).first()
            serializer = UserSerializer(user)
        else:
            padaria = Padaria.objects.filter(id=payload['id']).first()
            serializer = PadariaSerializer(padaria)

        return Response(serializer.data)


class PadariaPorCidadeView(APIView):
    def get(self, request, cep):
        response = requests.get(f'https://viacep.com.br/ws/{cep}/json/')
        if response.status_code != status.HTTP_200_OK:
            return JsonResponse(
                {'message': 'CEP inválido.'}, status=status.HTTP_400_BAD_REQUEST  # noqa: E501
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


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
