from django.urls import path
from .views import (
    home, Register_UserView, Register_PadariaView, LoginView,
    UserAndPadariaView, LogoutView, PadariaDetailsView, PadariaPorCidadeView,
    PlanoAssinaturaView, AssinaturaView, AssinantesView
)

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
    'padarias/<int:pk>',
    PadariaDetailsView.as_view(),
    name='padaria_details'),
  path(
    'padarias/cep/<str:cep>',
    PadariaPorCidadeView.as_view(),
    name='padarias_por_cidade'
  ),
  path(
    'padaria/plano_de_assinatura',
    PlanoAssinaturaView.as_view(),
    name='plano_de_assinatura_post'
  ),
  path(
    'plano_de_assinatura/padaria/<int:padaria_id>',
    PlanoAssinaturaView.as_view(),
    name='plano_de_assinatura_get'
  ),
  path(
    'usuario/assinaturas',
    AssinaturaView.as_view(),
    name='assinaturas_post'),
  path(
    'assinaturas/usuario/<int:user_id>',
    AssinaturaView.as_view(),
    name='assinaturas_get'
  ),
  path(
    'padaria/<int:padaria_id>/assinantes',
    AssinantesView.as_view(),
    name='assinantes'
  ),
  path('logout', LogoutView.as_view(), name='logout'),
]
