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
from django.db import models


class AnimationTags(models.Model):
  """
  This model holds tags extracted from animation names and triggers
  """
  tag = models.CharField('Animation tag', max_length=25, unique=True, null=False, db_index=True)

  @staticmethod
  def parse_tags(from_label):
    """
    This static method is used to parse tags from given label.
    It returns a list of AnimationTags objects.
    """
    import re

    RE_WORDS = re.compile(r'''
      # Find words in a string. Order matters!
      [A-Z]+(?=[A-Z][a-z]) |  # All upper case before a capitalized word
      [A-Z]?[a-z]+ |  # Capitalized words / all lower case
      [A-Z]+ |  # All upper case
      \d+  # Numbers
    ''', re.VERBOSE)

    tag_strings = RE_WORDS.findall(from_label)

    tags = [tag for tag, created in [ 
                AnimationTags.objects.get_or_create(
                    tag=t.lower(), 
                    defaults={'tag': t.lower()}
                  ) for t in tag_strings 
                ] ]

    return tags

  @staticmethod
  def find_weighted_objects(source, *tags):
    """
    Returns list of objects from given source that where tagged with a least one of given tags.
    Objects are ordered by number of tags match between object and query
    """
    def __compare_vectors(entry_tags, tags):
      return len( set(entry_tags) & set(tags) )

    entries = set(source.objects.filter(tags__tag__in=tags))
    entries_weighted = { str(entry): __compare_vectors(entry.get_tags(), tags) for entry in entries }

    return entries_weighted


  def __str__(self):
    return self.tag


class AnimationName(models.Model):
  """
  This model will store all animation names available for Vector
  """
  name = models.CharField('Animation name', max_length=50, unique=True, null=False, db_index=True)
  active = models.BooleanField('Is active', default=True, null=False)
  tags = models.ManyToManyField(AnimationTags)

  def get_tags(self):
    return [ tag.tag for tag in self.tags.all() ]

  def __str__(self):
    return self.name

class AnimationTrigger(models.Model):
  """
  This model will store all animation trigger names available for Vector
  """
  name = models.CharField('Animation trigger', max_length=50, unique=True, null=False, db_index=True)
  active = models.BooleanField('Is active', default=True, null=False)
  tags = models.ManyToManyField(AnimationTags)

  def get_tags(self):
    return [ tag.tag for tag in self.tags.all() ]

  def __str__(self):
    return self.name
