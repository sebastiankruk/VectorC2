from django.db import models

class Configuration(models.Model):
    """
    Basic model for storying any configuration details
    """
    key = models.CharField('Configuration key', max_length=50, unique=True, null=False, db_index=True)
    value = models.CharField('Configuration value', max_length=255, unique=False, null=True, db_index=True)

    @staticmethod
    def get_value(key, default_value=''):
        """
        Retrieves configuration for the given key, or returns default_value and creates configuration entry for that pair
        """
        config, was_created = Configuration.objects.get_or_create(key=key)

        if was_created:
            Configuration.set_value(key, default_value)
        
        return config.value
        

    @staticmethod
    def set_value(key, value):
        """
        Will update given configuration key with the new value
        """
        Configuration.objects.update_or_create(key=key, defaults={
            'key':key, 
            'value':value
        })

    class Meta:
        unique_together = ('key', 'value')

    
