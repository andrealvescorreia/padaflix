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

    def test_user_can_register_correctly(self):
        res = self.client.post(
            self.register_user_url, self.user_data, format="json"
        )
        self.assertEqual(res.data['nome'], self.user_data['nome'])
        self.assertEqual(res.data['endereco'], self.user_data['endereco'])
        self.assertEqual(res.data['email'], self.user_data['email'])
        self.assertEqual(res.status_code, 201)
