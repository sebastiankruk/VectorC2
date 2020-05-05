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

        if dimensions is None:
            if 'dimensions' not in VECTOR:
                VECTOR['dimensions'] = anki_vector.screen.dimensions()
            dimensions = VECTOR['dimensions']

        dim_id = '%dx%d' % dimensions

        cached_object = VectorPhotoCache.objects.filter(photo=photo, fill=fill, dimensions=dim_id)

        if not cached_object:
            # Convert the image to the format used by the Screen
            path = os.path.join(MEDIA_ROOT, photo.image.name)
            image_file = Image.open(path)
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
                delta = tuple( map(operator.sub, dimensions, new_dimensions) )
                padding = (delta[0]//2, delta[1]//2, delta[0]-(delta[0]//2), delta[1]-(delta[1]//2))
                resized_image = image_file.resize( new_dimensions, Image.ANTIALIAS) if resize != 1 else image_file
                ready_image = ImageOps.expand(resized_image, padding)

            name_parts = os.path.splitext(os.path.basename(photo.image.name))
            cache_dir = cached_path = os.path.join(MEDIA_ROOT, 'images', 'cache')
            if not os.path.exists(cache_dir):
                os.makedirs(cache_dir)
            cached_path = os.path.join(MEDIA_ROOT, 'images', 'cache', '%s-%dx%d-%s%s' % (
                name_parts[0], *dimensions, fill, name_parts[1]
            ))
            try:
                ready_image.save(cached_path)
                cached_object = VectorPhotoCache(photo=photo, fill=fill, dimensions=dim_id, cached_path=cached_path)
                cached_object.save()
            except Exception as ex:
                print(ex)

        else:
            ready_image = Image.open(cached_object.first().cached_path)

        screen_data = anki_vector.screen.convert_image_to_screen_data(ready_image)
        return screen_data


class VectorPhotoCache(models.Model):
    """
    Model for keeping cached versions of photos redone for Vector
    """
    photo = models.ForeignKey(UserPhotos, on_delete=models.CASCADE)
    fill = models.BooleanField(default=True)
    dimensions = models.CharField(max_length=15, default="184x96")
    cached_path = models.CharField(max_length=250)