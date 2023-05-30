from rest_framework.test import APITestCase
from django.urls import reverse


class TestSetUp(APITestCase):
    def setUp(self):
        self.register_user_url = reverse('register_user')
        self.register_padaria_url = reverse('register_padaria')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')

        self.user_data = {
            'nome': "Arthur",
            'endereco': {
                "cep": "58701750",
                "rua": "Nestor Pereira",
                "numero": "01",
                "bairro": "Bivar Olinto",
                "complemento": "",
                "uf": "PB"
            },
            'email': 'arthur@gmail.com',
            'password': 'Abc12345',
        }

        self.padaria_data = {
            'nome_fantasia': "Padaria",
            'endereco': {
                "cep": "58705750",
                "rua": "Dom Pedro II",
                "numero": "02",
                "bairro": "Centro",
                "complemento": "",
                "uf": "PB"
            },
            'cnpj': "11444777000122",
            'telefone': "83912365478",
            'email': 'padaria@gmail.com',
            'password': 'Padaria12345',
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()
