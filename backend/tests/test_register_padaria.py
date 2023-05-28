from .test_setup import TestSetUp


class TestRegisterPadaria(TestSetUp):
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
