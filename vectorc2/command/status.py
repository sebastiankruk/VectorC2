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
import anki_vector

class VectorStatus(object):
  """
  The class used to read Vector's status
  """
  def __init__(self, consumer):
    self._robot = anki_vector.AsyncRobot()
    self._consumer = consumer

  def connect(self):
    self._robot.connect()

  def disconnect(self):
    self._robot.disconnect()

  def read(self, states):
    """
    Will read Vector status and 
    """
    pass
  


