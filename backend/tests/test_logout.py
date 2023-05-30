from .test_setup import TestSetUp


class TestLogout(TestSetUp):
    def test_logout_success(self):
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, 200)
        self.assertTrue('jwt' in response.cookies)
        jwt_cookie = response.cookies['jwt']
        self.assertEqual(jwt_cookie.value, '')
