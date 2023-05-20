from rest_framework.test import APITestCase
from django.urls import reverse


class TestSetUp(APITestCase):
    def setUp(self):
        self.register_user_url = reverse('register_user')
        self.register_padaria_url = reverse('register_padaria')
        self.login_url = reverse('login')

        self.user_data = {
            'name': "Arthur",
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
            'cnpj': "11.444.777/0001-22",
            'telefone': "(83) 9 1236-5478",
            'email': 'padaria@gmail.com',
            'password': 'Padaria12345',
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()
