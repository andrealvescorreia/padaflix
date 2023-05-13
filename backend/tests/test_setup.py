from rest_framework.test import APITestCase
from django.urls import reverse


class TestSetUp(APITestCase):
    def setUp(self):
        self.register_user_url = reverse('register_user')
        self.register_padaria_url = reverse('register_padaria')
        self.login_url = reverse('login')

        self.user_data = {
            'name': "Arthur",
            'email': 'arthur@gmail.com',
            'password': 'Abc12345',
        }

        self.padaria_data = {
            'nome_fantasia': "Arthur",
            'cnpj': "11.444.777/0001-22",
            'telefone': "(83) 9 1236-5478",
            'email': 'arthur@gmail.com',
            'password': 'Abc12345',
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()
