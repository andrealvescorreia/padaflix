from .test_setup import TestSetUp
from authors.models import User


class TestLoginUser(TestSetUp):
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

    def test_user_cannot_login_with_existing_email(self):
        self.client.post(
            self.register_user_url, self.user_data, format="json"
        )

        existing_email = 'arthur@gmail.com'
        url = f'{self.login_url}?email={existing_email}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 400)

    def test_user_can_login_with_email(self):
        existing_email = 'arthur@gmail.com'
        url = f'{self.login_url}?email={existing_email}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 204)

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
