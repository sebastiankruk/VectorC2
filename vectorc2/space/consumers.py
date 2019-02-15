from channels.generic.websocket import AsyncWebsocketConsumer
import json
import time

class SpaceConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.space_name = self.scope['url_route']['kwargs']['space_name']
        self.space_group_name = 'space_%s' % self.space_name

        # Join room group
        await self.channel_layer.group_add(
            self.space_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.space_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.space_group_name,
            {
                'type': 'space_message',
                'message': message
            }
        )


    # Receive message from room group
    async def space_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))