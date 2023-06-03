from .test_setup import TestSetUp


class TestUserAndPadariaView(TestSetUp):
    def test_get_user_and_padaria_authenticated(self):
        pass

    def test_get_user_and_padaria_unauthenticated(self):
        response = self.client.get(self.user_and_padaria_url)
        self.assertEqual(response.status_code, 403)
