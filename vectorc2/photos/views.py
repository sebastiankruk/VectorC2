import json

from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.utils.translation import gettext as _
from django.shortcuts import render
from django.template.loader import render_to_string

from images.forms import UploadFileForm
from images.models import UserPhotos

import anki_vector
from PIL import Image
import io

def thumbnail(request, id):
  """
  Returns single photo as thumbnail
  """
  return photo(request, id, is_thumbnail=True)


def count(request):
  """
  Returns number of photos kept by Vector
  """
  return photo(request, is_count=True)


def photo(request, id=None, is_thumbnail=False, is_count=False):
  """
  Enables to retrieve html mixin for many or a single image id
  """
  if request.method == 'GET':
    params = {
      'offset': int(request.GET.get('offset', 0)),
      'max_count': int(request.GET.get('max_count', -1)),
      'serial': request.GET.get('vector_serial', None),
      'name': request.GET.get('vector_name', None),
      'ip': request.GET.get('vector_ip', None)
    }
    response = _list_photos(request, is_count, **params) if id is None else \
               _get_single_photo(request, id, is_thumbnail, **params)
  else:
    response = {
      'content': _('Only GET is allowed'),
      'status': 405
    }
  return response if isinstance(response, HttpResponse) else HttpResponse(**response)


def _list_photos(request, is_count, offset, max_count, serial, name, ip):
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
  with anki_vector.Robot(serial=serial, ip=ip, name=name) as robot:
    photo_info = robot.photos.photo_info

    content = {
      'total_count': len(photo_info)
    }
    
    if not is_count:
      photo_infos = photo_info[offset:offset+max_count] \
                    if (max_count > 0) else \
                    photo_info[offset:]
      photos_mixim = render_to_string('photos/photos_in_gallery.html', { 'photos': photo_infos }, request)

      content.update({
        'offset': offset,
        'max_count': max_count,
        'html': photos_mixim,
      })

    return {
      'content': json.dumps(content),
      'content_type': 'application/json',
      'status': 200
    }

  # in case we had issues with contacting Vector
  return {
      'content': _('Contacting Vector did not work'),
      'status': 500
  }

    

def _get_single_photo(request, id, is_thumbnail, offset, max_count, serial, name, ip):
  '''
  Returns information about a single image in a form ready to be sent back
  '''
  with anki_vector.Robot(serial=serial, ip=ip, name=name) as robot:
    photo = robot.photos.get_thumbnail(id) \
            if is_thumbnail else \
            robot.photos.get_photo(id)
    if photo.success:            
      image = Image.open(io.BytesIO(photo.image))

      response = HttpResponse(content_type='image/jpg')
      image.save(response, "JPEG")
      response['Content-Disposition'] = 'attachment; filename="vector_photo_%s%s.jpg"' % \
                                        ( 'thumbnail_' if is_thumbnail else ''  , id)

    else:
      raise Http404("No photo with index %d available" % id)

    return response

