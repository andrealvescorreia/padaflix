from .test_setup import TestSetUp
from authors.models import User, Padaria


class TestViews(TestSetUp):
    def test_user_cannot_register_with_no_data(self):
        res = self.client.post(self.register_user_url)
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_without_name(self):
        self.user_data['nome'] = ''

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_invalid_cep(self):
        self.user_data['endereco']['cep'] = "123456789"

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_without_cep(self):
        self.user_data['endereco']['cep'] = ""

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_invalid_rua(self):
        self.user_data['endereco']['rua'] = ""

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_invalid_numero(self):
        self.user_data['endereco']['numero'] = ""

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_invalid_bairro(self):
        self.user_data['endereco']['bairro'] = ""

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_invalid_uf(self):
        self.user_data['endereco']['uf'] = "Paraíba"

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_without_uf(self):
        self.user_data['endereco']['uf'] = ""

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_can_register_correctly(self):
        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.data['nome'], self.user_data['nome'])
        self.assertEqual(res.data['endereco'], self.user_data['endereco'])
        self.assertEqual(res.data['email'], self.user_data['email'])
        self.assertEqual(res.status_code, 201)

    def test_user_cannot_login_with_unverified_email(self):
        self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        wrong_email = {
            'email': 'emailquenaofoiregistrado@gmail.com',
            'password': 'Abc12345',
        }
        res = self.client.post(self.login_url, wrong_email, format="json")
        self.assertEqual(res.status_code, 401)

    def test_user_cannot_login_with_unverified_password(self):
        self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        wrong_email = {
            'email': 'arthur@gmail.com',
            'password': 'Def67890',
        }
        res = self.client.post(self.login_url, wrong_email, format="json")
        self.assertEqual(res.status_code, 401)

    def test_user_can_login_after_verification(self):
        response = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        email = response.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()
        res = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(res.status_code, 200)

    def test_padaria_cannot_register_with_no_data(self):
        res = self.client.post(self.register_padaria_url)
        self.assertEqual(res.status_code, 400)

    def test_padaria_can_register_correctly(self):
        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.data['nome_fantasia'], self.padaria_data['nome_fantasia'])  # noqa: E501
        self.assertEqual(res.data['endereco'], self.padaria_data['endereco'])
        self.assertEqual(res.data['cnpj'], self.padaria_data['cnpj'])
        self.assertEqual(res.data['telefone'], self.padaria_data['telefone'])
        self.assertEqual(res.data['email'], self.padaria_data['email'])
        self.assertEqual(res.status_code, 201)

    def test_padaria_cannot_login_with_unverified_email(self):
        self.client.post(self.register_padaria_url, self.padaria_data, format="json")  # noqa: E501
        wrong_email = {
            'email': 'emailquenaofoiregistrado@gmail.com',
            'password': 'Padaria12345',
        }
        res = self.client.post(self.login_url, wrong_email, format="json")  # noqa: E501

        self.assertEqual(res.status_code, 401)

    def test_padaria_cannot_login_with_unverified_password(self):
        self.client.post(self.register_padaria_url, self.padaria_data, format="json")  # noqa: E501
        wrong_email = {
            'email': 'padaria@gmail.com',
            'password': 'Padoca123',
        }
        res = self.client.post(self.login_url, wrong_email, format="json")  # noqa: E501

        self.assertEqual(res.status_code, 401)

    def test_padaria_can_login_after_verification(self):
        response = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        email = response.data['email']
        padaria = Padaria.objects.get(email=email)
        padaria.is_verified = True
        padaria.save()
        res = self.client.post(self.login_url, self.padaria_data, format="json")  # noqa: E501
        self.assertEqual(res.status_code, 200)
