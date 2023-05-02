from django.urls import path
from .views import home, Register_UserView, Register_PadariaView, LoginView, UserView, PadariaView, LogoutView  # noqa: E501

urlpatterns = [
  path('', home, name='home'),
  path('register_user', Register_UserView.as_view()),
  path('register_padaria', Register_PadariaView.as_view()),
  path('login', LoginView.as_view()),
  path('user', UserView.as_view()),
  path('padaria', PadariaView.as_view()),
  path('logout', LogoutView.as_view()),
]
