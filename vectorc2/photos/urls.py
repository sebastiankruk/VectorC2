from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from photos import views

urlpatterns = [
    path('', views.photo, name='REST API for photos'),
    path('<int:id>', views.photo, name='REST API for photos'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
