from .test_setup import TestSetUp
from authors.models import Padaria, Endereco


class TestRegisterPadaria(TestSetUp):
    def test_padaria_cannot_register_with_no_data(self):
        res = self.client.post(self.register_padaria_url)
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_without_name(self):
        self.padaria_data['nome_fantasia'] = ''

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_invalid_cep(self):
        self.padaria_data['endereco']['cep'] = "123456789"

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_without_cep(self):
        self.padaria_data['endereco']['cep'] = ""

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_invalid_rua(self):
        self.padaria_data['endereco']['rua'] = ""

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_invalid_numero(self):
        self.padaria_data['endereco']['numero'] = ""

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_invalid_bairro(self):
        self.padaria_data['endereco']['bairro'] = ""

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_invalid_uf(self):
        self.padaria_data['endereco']['uf'] = "Paraíba"

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_without_uf(self):
        self.padaria_data['endereco']['uf'] = ""

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_invalid_cnpj(self):
        self.padaria_data['cnpj'] = "114447770001229"

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_without_cnpj(self):
        self.padaria_data['cnpj'] = ""

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_existing_cnpj(self):
        endereco = Endereco.objects.create(
            cep="58705750",
            rua="Rua Dom Pedro II",
            numero="01",
            bairro="Centro",
            complemento="",
            uf="PB"
        )

        padaria_existente = Padaria.objects.create(
            nome_fantasia="Padaria Existente",
            endereco=endereco,
            cnpj="11444777000122",
            telefone="83912365478",
            email="padaria_existente@gmail.com",
            password="Padaria12345"
        )

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )

        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_invalid_telefone(self):
        self.padaria_data['telefone'] = "839123654780"

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_without_telefone(self):
        self.padaria_data['telefone'] = ""

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_existing_telefone(self):
        endereco = Endereco.objects.create(
            cep="58705750",
            rua="Rua Dom Pedro II",
            numero="01",
            bairro="Centro",
            complemento="",
            uf="PB"
        )

        padaria_existente = Padaria.objects.create(
            nome_fantasia="Padaria Existente",
            endereco=endereco,
            cnpj="11444777000122",
            telefone="83912365478",
            email="padaria_existente@gmail.com",
            password="Padaria12345"
        )

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )

        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_invalid_email_v1(self):
        self.padaria_data['email'] = "arthurgmailcom"

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_invalid_email_v2(self):
        self.padaria_data['email'] = "arthur@gmailcom"

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_invalid_email_v3(self):
        self.padaria_data['email'] = "arthurgmail.com"

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_without_email(self):
        self.padaria_data['email'] = ""

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_existing_email_post(self):
        endereco = Endereco.objects.create(
            cep="58705750",
            rua="Rua Dom Pedro II",
            numero="01",
            bairro="Centro",
            complemento="",
            uf="PB"
        )

        padaria_existente = Padaria.objects.create(
            nome_fantasia="Padaria Existente",
            endereco=endereco,
            cnpj="11444777000122",
            telefone="83912365478",
            email="padaria@gmail.com",
            password="Padaria12345"
        )

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )

        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_existing_email_get(self):
        self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )

        existing_email = 'padaria@gmail.com'
        url = f'{self.register_padaria_url}?email={existing_email}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 400)

    def test_padaria_can_register_with_email_get(self):
        existing_email = 'padaria@gmail.com'
        url = f'{self.register_padaria_url}?email={existing_email}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 204)

    def test_padaria_cannot_register_with_password_less_than_8_digits(self):
        self.padaria_data['password'] = "Abc12"

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_password_without_numbers(self):
        self.padaria_data['password'] = "Abcdefgh"

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_with_non_capitalized_password(self):
        self.padaria_data['password'] = "abc12345"

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_padaria_cannot_register_without_password(self):
        self.padaria_data['password'] = ""

        res = self.client.post(
            self.register_padaria_url, self.padaria_data, format="json"
        )
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
