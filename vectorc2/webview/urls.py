from django.urls import path
from webview import views
from django.views.i18n import JavaScriptCatalog

urlpatterns = [
  path("", views.home, name="home"),
  path('jsi18n/', JavaScriptCatalog.as_view(), name='javascript-catalog'),
]