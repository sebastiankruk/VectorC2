import json

from django.http import HttpResponseRedirect, HttpResponse
from django.utils.translation import gettext as _
from django.shortcuts import render
from django.template.loader import render_to_string

from photos.forms import UploadFileForm
from photos.models import UserPhotos


def photo(request, id=None):
  """
  Enables to retrieve html mixin for or delete a single photo id
  """
  if id is None:
    if request.method == 'GET': # /list
      response = _list_photos(request)
    elif request.method == 'POST': # /upload
      response = _upload_single_photo(request)
    else:
      response = {
        'content': _('Only GET or POST are allowed when ID is NOT provided'),
        'status': 405
      }
  else:
    if request.method == 'GET':
      response = _get_single_photo(request, id)
    elif request.method == 'DELETE':
      response = _remove_single_photo(request, id)
    else:
      response = {
        'content': _('Only GET or DELETE are allowed when ID is provided'),
        'status': 405
      }

  return HttpResponse(**response)


def _upload_single_photo(request):
  '''
  Enables to upload photo coming in the POST payload
  '''
  form = UploadFileForm(data=request.POST, files=request.FILES)
  if form.is_valid():
    form.save()
    response = {
      'status': 200,
      'content': json.dumps({
        'id': form.instance.id,
        'image': form.instance.image.name,
        'label': form.instance.label,
        'html': render_to_string('photos/photos_in_gallery.html', { 'photos': [ form.instance ] }, request)
      }),
      "content_type": "application/json"
    }
  else:
    response = {
      'status': 400,
      'content': str(form.errors)
    }

  return response


def _list_photos(request):
  """
  View function that enables to access photos.j
  There are two parameters expected:
  - max_count - maximum number of photos to return
  - offset - which is the first photo index to return

  This call will return the following JSON object:
  {
    'content': {
      'offset': $offset_requested,
      'max_count': $max_count,
      'count': $actual_count_of_photos_in_the_set,
      'html': 'HTML mixim'
    }
    'status': $http_status_code
  } 
  """
  offset = int(request.GET.get('offset', 0))
  max_count = int(request.GET.get('max_count', -1))

  qs_photos = UserPhotos.objects.order_by('label', 'upload_date')
  photos = qs_photos[offset:max_count] if (max_count > 0) else qs_photos[offset:]
  photos_mixim = render_to_string('photos/photos_in_gallery.html', { 'photos': photos }, request)

  return {
    'content': json.dumps({
      'offset': offset,
      'max_count': max_count,
      'count': qs_photos.count(),
      'html': photos_mixim,
    }),
    'content_type': 'application/json',
    'status': 200
  }
  

def _get_single_photo(request, id):
  '''
  Returns information about a single photon in a form ready to be sent back
  '''
  photo = UserPhotos.objects.filter(id=id)
  photos_mixim = render_to_string('photos/photos_in_gallery.html', { 'photos': [ photo ] }, request)

  return {
    'content': json.dumps({
      'count': photo.count(),
      'html': photos_mixim,
    }),
    'content_type': 'application/json',
    'status': 200
  }


def _remove_single_photo(request, id):
  '''
  Removes photo with given id
  '''
  photo = UserPhotos.objects.filter(id=id).delete()
  return {
    'content': json.dumps({
      
    }),
    'content_type': 'application/json',
    'status': 200
  }
