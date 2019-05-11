from django.db import models

# Create your models here.
class Configuration(models.Model):
    status_checking_frequency = models.IntegerField(default=0)
