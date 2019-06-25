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
import re
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Cannot import from PIL: Do `pip3 install --user Pillow` to install")

import anki_vector

from command import consts
from blocks.models import AnimationTags, AnimationName, AnimationTrigger
from photos.models import UserPhotos


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



RE_FIND_TAG = re.compile(r'\w+')

def find_animation(query_tags, dropdown_search_type=consts.matching.BEST, is_trigger=False):
  """
  Returns a single animation name that is currently available
  """
  import random

  source = AnimationTrigger if is_trigger else AnimationName

  if len(query_tags.strip()) == 0 or query_tags == '*':
    result = str(random.choice(source.objects.all()))
  else:  
    tags = RE_FIND_TAG.findall(query_tags.lower())
    entries_weighted = AnimationTags.find_weighted_objects(source, *tags)

    if len(entries_weighted) == 0:
      # default value 
      result = 'NeutralFace' if is_trigger else 'anim_eyepose_sad_down'

    elif dropdown_search_type == consts.matching.BEST:
      import operator
      result = sorted(entries_weighted.items(), key=operator.itemgetter(1), reverse=True)[0][0]

    elif dropdown_search_type == consts.matching.RANDOM:
      result = random.choice(list(entries_weighted.keys()))

    else: # weighted random
      from numpy.random import choice
      vsum = sum(entries_weighted.values())
      result = choice(list(entries_weighted.keys()), 
                      1,
                      p=[float(v)/vsum for v in entries_weighted.values()])[0]

    print('Found following animations: %s' % entries_weighted)

  print('Will run animation: %s' % result)

  return result


def set_screen_image(robot, id=None, label=None, duration=2.0, interrupt=True):
  """
  Wrapper function to enable to call the actual 
  """
  photo = UserPhotos.objects.filter(id=id) if id is not None else UserPhotos.objects.filter(label=label)

  image_file = Image.open('../media/%s' % photo.image.name)

  print(image_file)

  # Convert the image to the format used by the Screen
  screen_data = anki_vector.screen.convert_image_to_screen_data(image_file)
  robot.screen.set_screen_with_image_data(screen_data, duration_sec=duration, interrupt_running=interrupt)
