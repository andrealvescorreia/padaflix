from django.urls import path
from .views import home, Register_UserView, Register_PadariaView, LoginView
from .views import UserAndPadariaView, LogoutView, PadariaPorCidadeView

urlpatterns = [
  path('', home, name='home'),
  path('register_user', Register_UserView.as_view(), name='register_user'),
  path(
    'register_padaria',
    Register_PadariaView.as_view(),
    name='register_padaria'
  ),
  path('login', LoginView.as_view(), name='login'),
  path('user', UserAndPadariaView.as_view(), name='user_and_padaria'),
  path(
    'padarias/<str:cep>',
    PadariaPorCidadeView.as_view(),
    name='padarias_por_cidade'
  ),
  path('logout', LogoutView.as_view(), name='logout'),
]
