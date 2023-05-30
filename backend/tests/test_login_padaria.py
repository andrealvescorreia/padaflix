from .test_setup import TestSetUp
from authors.models import Padaria


class TestViews(TestSetUp):
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
