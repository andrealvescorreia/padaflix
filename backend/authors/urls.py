from django.urls import path
from .views import home, Register_UserView, Register_PadariaView, LoginView, UserView, PadariaView, LogoutView  # noqa: E501

urlpatterns = [
  path('', home, name='home'),
  path('register_user', Register_UserView.as_view(), name='register_user'),
  path('register_padaria', Register_PadariaView.as_view(), name='register_padaria'),
  path('login', LoginView.as_view(), name='login'),
  path('user', UserView.as_view(), name='user'),
  path('padaria', PadariaView.as_view(), name='padaria'),
  path('logout', LogoutView.as_view(), name='logout'),
]
