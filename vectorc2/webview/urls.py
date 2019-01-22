from django.urls import path
from webview import views

urlpatterns = [
    path("", views.home, name="home"),
]