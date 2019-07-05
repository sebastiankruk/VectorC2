from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from images import views

urlpatterns = [
    path('', views.image, name='REST API for images'),
    path('<int:id>', views.image, name='REST API for images'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
