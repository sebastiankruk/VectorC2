import sys
from io import StringIO
import contextlib


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
    sys.stderr = OuputProxy(sys.stderr, stderr, self.consumer, 'error')
    yield sys.stdout, sys.stderr
    sys.stdout, sys.stderr = oldout, olderr

  def run(self, code):
    """
    Call to run code    
    """
    # TODO: add protection against imports, __* type of stuff

    with self._stdoutIO() as (sout, serr):
      exec(code)
  