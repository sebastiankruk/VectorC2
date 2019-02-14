from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import url

from . import consumers


websocket_urlpatterns = [
    url(r'^ws/channel/(?P<channel_name>[^/]+)/$', consumers.ChannelConsumer),
]

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})