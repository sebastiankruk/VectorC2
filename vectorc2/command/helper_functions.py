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
from command import consts

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


def find_animation(query_tags, dropdown_search_type='best_matching', is_trigger=False):
  """
  Returns a single animation name that is currently available
  """
  #TODO implement
  return 'anim_holiday_hny_fireworks_01'
