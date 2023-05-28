from .test_setup import TestSetUp


class TestRegisterUser(TestSetUp):
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

    def test_user_cannot_register_with_invalid_email_v1(self):
        self.user_data['email'] = "arthurgmailcom"

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_invalid_email_v2(self):
        self.user_data['email'] = "arthur@gmailcom"

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_invalid_email_v3(self):
        self.user_data['email'] = "arthurgmail.com"

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_without_email(self):
        self.user_data['email'] = ""

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_existing_email(self):
        self.client.post(
                self.register_user_url, self.user_data, format="json"
            )
        res = self.client.post(
                self.register_user_url, self.user_data, format="json"
            )

        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_password_less_than_8_digits(self):
        self.user_data['password'] = "Abc12"

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_password_without_numbers(self):
        self.user_data['password'] = "Abcdefgh"

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_non_capitalized_password(self):
        self.user_data['password'] = "abc12345"

        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_without_password(self):
        self.user_data['password'] = ""

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
