from django.urls import path
from .views import Register_UserView, Register_PadariaView, Login_UserView, Login_PadariaView, UserView, PadariaView, LogoutView  # noqa: E501

urlpatterns = [
  path('register_user', Register_UserView.as_view()),
  path('register_padaria', Register_PadariaView.as_view()),
  path('login_user', Login_UserView.as_view()),
  path('login_padaria', Login_PadariaView.as_view()),
  path('user', UserView.as_view()),
  path('padaria', PadariaView.as_view()),
  path('logout', LogoutView.as_view()),
]
