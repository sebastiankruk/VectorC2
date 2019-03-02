#  Copyright 2019 Sebastian Ryszard Kruk <vectorc2@kruk.me>
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from command.commander import Commander
from command.status import VectorStatus
import json
import time
import sys

class SpaceConsumer(WebsocketConsumer):
  '''
  Generic WebSocket consumer
  '''

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

  def send_message(self, message, _type='text'):
    try:
      text_data = json.dumps({
        'message': message,
        'type': _type if isinstance(_type, str) else 'text'
      })
      # Send message to WebSocket
      self.send(text_data=text_data)
    except:
      import traceback
      e = sys.exc_info()[0]
      print(e)
      print(_type)
      traceback.print_exc()



class StateConsumer(WebsocketConsumer):
  '''
  WebSocket consumer dedicated for retrieving vector status
  '''
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.vector_status = VectorStatus(self)

  def connect(self):
    # self.space_name = self.scope['url_route']['kwargs']['space_name']
    self.space_group_name = 'space_vector_status'

    async_to_sync(self.channel_layer.group_add)(
      self.space_group_name,
      self.channel_name
    )

    self.accept()
    self.vector_status.connect()

  def disconnect(self, close_code):
    async_to_sync(self.channel_layer.group_discard)(
      self.space_group_name,
      self.channel_name
    )
    self.vector_status.disconnect()

  # Receive message from WebSocket
  def receive(self, text_data):
    text_data_json = json.loads(text_data)
    statuses = text_data_json.get('statuses', [])

    # Send message to room group
    async_to_sync(self.channel_layer.group_send)(
      self.space_group_name,
      {
        'type': 'space_message',
        'statuses': statuses
      }
    )

  # Receive message from room group
  def space_message(self, event):
    statuses = event['statuses']
    self.vector_status.read(statuses)

  def send_status(self, status):
    try:
      text_data = json.dumps(status)
      # Send message to WebSocket
      self.send(text_data=text_data)
    except:
      import traceback
      print(sys.exc_info()[0])
      traceback.print_exc()