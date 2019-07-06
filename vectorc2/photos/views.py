import json

from django.http import HttpResponseRedirect, HttpResponse
from django.utils.translation import gettext as _
from django.shortcuts import render
from django.template.loader import render_to_string

from images.forms import UploadFileForm
from images.models import UserPhotos

import anki_vector


def photo(request, id=None, is_thumbnail=False):
  """
  Enables to retrieve html mixin for many or a single image id
  """
  if request.method == 'GET':
    response = _list_photos(request) if id is None else \
               _get_single_photo(request, id, is_thumbnail)
  else:
    response = {
      'content': _('Only GET is allowed'),
      'status': 405
    }
  return HttpResponse(**response)


def _list_photos(request):
  """
  View function that enables to access images.j
  There are two parameters expected:
  - max_count - maximum number of images to return
  - offset - which is the first image index to return

  This call will return the following JSON object:
  {
    'content': {
      'offset': $offset_requested,
      'max_count': $max_count,
      'count': $actual_count_of_images_in_the_set,
      'html': 'HTML mixim'
    }
    'status': $http_status_code
  } 
  """
  offset    = int(request.GET.get('offset', 0))
  max_count = int(request.GET.get('max_count', -1))
  serial    = request.GET.get('vector_serial', None)
  name      = request.GET.get('vector_name', None)
  ip        = request.GET.get('vector_ip', None)

  with anki_vector.Robot(serial=serial, ip=ip, name=name) as robot:
    photo_infos = robot.photos.photo_info[offset:offset+max_count] \
                  if (max_count > 0) else \
                  robot.photos.photo_info[offset:]
    photos_mixim = render_to_string('photos/photos_in_gallery.html', { 'photos': photo_infos }, request)

    return {
      'content': json.dumps({
        'offset': offset,
        'max_count': max_count,
        'total_count': robot.photos.photo_info.count(),
        'html': photos_mixim,
      }),
      'content_type': 'application/json',
      'status': 200
    }

  # in case we had issues with contacting Vector
  return {
      'content': _('Contacting Vector did not work'),
      'status': 500
  }

    

def _get_single_photo(request, id, is_thumbnail=False):
  '''
  Returns information about a single image in a form ready to be sent back
  '''
  image = UserPhotos.objects.filter(id=id)
  images_mixim = render_to_string('images/images_in_gallery.html', { 'images': [ image ] }, request)

  return {
    'content': json.dumps({
      'count': image.count(),
      'html': images_mixim,
    }),
    'content_type': 'application/json',
    'status': 200
  }
