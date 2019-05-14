from django.db import models

class AnimationName(models.Model):
  """
  This model will store all animation names available for Vector
  """
  name = models.CharField('Animation name', max_length=50, unique=True, null=False, db_index=True)
  active = models.BooleanField('Is active', default=True, null=False)


class AnimationTrigger(models.Model):
  """
  This model will store all animation trigger names available for Vector
  """
  name = models.CharField('Animation trigger', max_length=50, unique=True, null=False, db_index=True)
  active = models.BooleanField('Is active', default=True, null=False)

