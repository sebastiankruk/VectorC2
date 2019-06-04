from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from photos import views

urlpatterns = [
    path('upload/', views.upload, name='imageupload'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
