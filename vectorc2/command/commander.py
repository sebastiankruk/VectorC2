import json

class Commander(object):

  def __init__(self, consumer):
    self.consumer = consumer

  def run(self, code):
    """
    Call to run code    
    """
    self.consumer.send_message(code)
  