import os
import sys

from PIL import Image, ImageOps

import anki_vector

from django.db import models
from vectorc2.settings import MEDIA_ROOT, VECTOR

class UserPhotos(models.Model):
    """
    Model for keeping user uploaded photos.
    """
    image = models.ImageField(upload_to="images/")    
    label = models.CharField('Image label', max_length=30, unique=False, null=False, db_index=True)
    upload_date=models.DateTimeField(auto_now_add=True)

    @staticmethod
    def get_vector_photo(id=None, label=None, fill=True, dimensions=None):
        """
        Will return existing or create a new version of photos for Vector.
        :param id get image by id
        :param label get first image matching given label
        :param dimensions new dimensions for resizes image, if not provided (184, 96) is used
        :param fill should we fill the space or surround photo with border
        """
        if id is None and label is None:
            return None

        photo = (UserPhotos.objects.filter(id=id) if id is not None else UserPhotos.objects.filter(label=label)).first()
        path = os.path.join(MEDIA_ROOT, photo.image.name)
        image_file = Image.open(path)

        if dimensions is None:
            if 'dimensions' not in VECTOR:
                VECTOR['dimensions'] = anki_vector.screen.dimensions()
            dimensions = VECTOR['dimensions']

        image_dim = image_file.size

        if fill:
            resize = max( tuple( sdim/float(idim) for sdim, idim in zip( dimensions, image_dim ) ) )
            new_dimensions = tuple(int(dim * resize) for dim in image_dim)
            resized_image = image_file.resize( new_dimensions, Image.ANTIALIAS) if resize != 1 else image_file
            ready_image = resized_image.crop((0, 0, dimensions[0], dimensions[1]))
        else:
            import operator
            #https://jdhao.github.io/2017/11/06/resize-image-to-square-with-padding/
            resize = min( tuple( sdim/float(idim) for sdim, idim in zip( dimensions, image_dim ) ) )
            new_dimensions = tuple(int(dim * resize) for dim in image_dim) if resize != 1 else image_dim
            delta = tuple( map(operator.sub, new_dimensions, dimensions) )
            padding = (delta[0]//2, delta[1]//2, delta[0]-(delta[0]//2), delta[1]-(delta[1]//2))
            resized_image = image_file.resize( new_dimensions, Image.ANTIALIAS) if resize != 1 else image_file
            ready_image = ImageOps.expand(resized_image, padding)

        # Convert the image to the format used by the Screen
        screen_data = anki_vector.screen.convert_image_to_screen_data(ready_image)

        return screen_data