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
import threading
import random
import datetime
from concurrent import futures

class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]



class VectorStatus(metaclass=Singleton):
  """
  The class used to read Vector's status
  """
  def __init__(self):
    self._robot = anki_vector.AsyncRobot()
    self._state = None
    self._rnd = random.random()
    self._countdown = 10
    self._frequency = 0
    self._timer = None

    # checking is not inited by default    
    # threading.Timer(10.0, self._check_state)
    # self._timer.start()

  def _check_state(self, _from_init=True):
    """
    Used to call update Vector state
    """
    if not self._robot:
      self._countdown = -1
      return

    print("Checking status")
    try:
      self._connect()
      state = {
        'current': {
          'are_motors_moving': self._robot.status.are_motors_moving,
          'are_wheels_moving': self._robot.status.are_wheels_moving,
          'is_animating': self._robot.status.is_animating,
          'is_being_held': self._robot.status.is_being_held,
          'is_button_pressed': self._robot.status.is_button_pressed,
          'is_carrying_block': self._robot.status.is_carrying_block,
          'is_charging': self._robot.status.is_charging,
          'is_cliff_detected': self._robot.status.is_cliff_detected,
          'is_docking_to_marker': self._robot.status.is_docking_to_marker,
          'is_falling': self._robot.status.is_falling,
          'is_head_in_pos': self._robot.status.is_head_in_pos,
          'is_in_calm_power_mode': self._robot.status.is_in_calm_power_mode,
          'is_on_charger': self._robot.status.is_on_charger,
          'is_pathing': self._robot.status.is_pathing,
          'is_picked_up': self._robot.status.is_picked_up,
          'is_robot_moving': self._robot.status.is_robot_moving,
        },
        'robot': {
          'head_angle_rad': self._robot.head_angle_rad,
          'lift_height_mm': self._robot.lift_height_mm,
          'pose_angle_rad': self._robot.pose_angle_rad,
          'pose_pitch_rad': self._robot.pose_pitch_rad,
          'right_wheel_speed_mmps': self._robot.right_wheel_speed_mmps,
          'x_y_z': self._robot.gyro.x_y_z,
        },
        '_meta': {
          'frequency': self._frequency
        }
      }

      future_battery_state = self._robot.get_battery_state()
      future_network_state = self._robot.get_network_state()
      future_version_state = self._robot.get_version_state()
      
      (fdone, fnot_done) = futures.wait([
                                          future_battery_state,
                                          future_network_state,
                                          future_version_state
                                        ], 
                                        timeout=1.5, 
                                        return_when=futures.ALL_COMPLETED)

      if future_battery_state in fdone:
        battery_state = future_battery_state.result()
        state['battery'] = {
          'battery_volts': battery_state.battery_volts, 
          'battery_level': battery_state.battery_level, 
          'is_charging': battery_state.is_charging, 
          'is_on_charger_platform': battery_state.is_on_charger_platform, 
          'suggested_charger_sec': battery_state.suggested_charger_sec, 
        }

      # if future_network_state in fdone:
      #   network_state = future_network_state.result()
      #   state['network'] = str(network_state.network_stats)

      if future_version_state in fdone:
        version_state = future_version_state.result()
        state['version'] = {
          'os_version': version_state.os_version,
          'engine_build_id': version_state.engine_build_id,
        }
      self._state = state
    except Exception:
        self._stop_refresh()

    finally:
      if _from_init and self._countdown > 0 and self._frequency > 0:
        self._countdown -= 1
        self._timer = threading.Timer(self._frequency, self._check_state)
        self._timer.start()

      if not self._disconnect():
        self._stop_refresh()

  def _stop_refresh(self):
    """
    Will stop refreshing, set frequency to 0, and remove timer
    """
    self._countdown = -1
    self._frequency = 0
    if self._timer is not None:
      self._timer.cancel()
      self._timer = None


  def _connect(self):
    try:
      self._robot.connect()
    except:
      e = sys.exc_info()[0]
      print("Could not connect: "+str(e))

  def _disconnect(self):
    """
    Will return False if cound not disconnect
    """
    try:
      self._robot.disconnect()
    except Exception:
      return False

    return True

  def read(self, consumer, states, frequency):
    """
    Will read Vector status and 
    #TODO implement support for selective 'states'
    """
    if frequency is not None:
      self._frequency = frequency

    if self._state is None:
      self._check_state(_from_init=False)
      self._timer = threading.Timer(self._frequency, self._check_state)
      self._timer.start()

    self._countdown = 10
    consumer.send_status(self._state)