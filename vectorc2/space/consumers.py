from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from command.commander import Commander
import json
import time

class SpaceConsumer(WebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.commander = Commander(self)

    def connect(self):
        self.space_name = self.scope['url_route']['kwargs']['space_name']
        self.space_group_name = 'space_%s' % self.space_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.space_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.space_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.space_group_name,
            {
                'type': 'space_message',
                'message': message
            }
        )


    # Receive message from room group
    def space_message(self, event):
        message = event['message']
        self.commander.run(message)

    def send_message(self, message):
        text_data = json.dumps({
            'message': message
        })
        # Send message to WebSocket
        self.send(text_data=text_data)