# space/routing.py
from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    url(r'^ws/space/(?P<space_name>[^/]+)/$', consumers.SpaceConsumer),
]