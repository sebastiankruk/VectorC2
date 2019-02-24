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
import sys
from io import StringIO
import contextlib

def rgb_to_hs(rgbstr):
  """
  Convert RGB color to (hue, saturation)
  """
  import colorsys
  import math
  r, g, b = bytes.fromhex(rgbstr[1:])
  h, s, v = colorsys.rgb_to_hsv(r, g, b)

  s2 = 0.5+(255-v)/512

  return {'hue':h, 'saturation':s2}

class OuputProxy(object):
  """
  Proxy object wrapping outputing to given stream, stringIO, and WS consumer
  """
  def __init__(self, stdout, stringio, consumer, message_type):
    self._stdout = stdout
    self._stringio = stringio
    self._type = message_type
    self._consumer = consumer

  def __getattr__(self, name):
    if name in ('_stdout', '_stringio', '_type', '_consumer', 'write'):
      object.__getattribute__(self, name)
    else:
      return getattr(self._stringio, name)

  def write(self, data):
    """
    Performs the actual write to registered outputs
    """
    self._stdout.write(data)
    self._stringio.write(data)
    if self._type is not None:
      self._consumer.send_message(data, _type=self._type)


class Commander(object):
  """
  The most important class here: enables to run code enpacked in text, and route output back to user.
  """

  def __init__(self, consumer):
    self.consumer = consumer

  @contextlib.contextmanager
  def _stdoutIO(self, stdout=None, stderr=None):
    """
    Trick to replace stdout and stderr with proxy
    """
    oldout, olderr = sys.stdout, sys.stderr
    if stdout is None:
      stdout = StringIO()
    if stderr is None:
      stderr = StringIO()
    sys.stdout = OuputProxy(sys.stdout, stdout, self.consumer, 'text')
    # sys.stderr = OuputProxy(sys.stderr, stderr, self.consumer, 'error')
    sys.stderr = OuputProxy(sys.stderr, stderr, self.consumer, None)
    yield sys.stdout, sys.stderr
    sys.stdout, sys.stderr = oldout, olderr

  def run(self, code):
    """
    Call to run code    
    """
    # TODO: add protection against imports, __* type of stuff

    with self._stdoutIO() as (sout, serr):
      try:
        exec(code)
      except:
        e = sys.exc_info()[0]
        self.consumer.send_message(e, _type="error")
      finally:
        self.consumer.send_message("finished", _type="command")