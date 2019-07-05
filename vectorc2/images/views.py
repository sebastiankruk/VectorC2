import json

from django.http import HttpResponseRedirect, HttpResponse
from django.utils.translation import gettext as _
from django.shortcuts import render
from django.template.loader import render_to_string

from images.forms import UploadFileForm
from images.models import UserPhotos


def image(request, id=None):
  """
  Enables to retrieve html mixin for or delete a single image id
  """
  if id is None:
    if request.method == 'GET': # /list
      response = _list_images(request)
    elif request.method == 'POST': # /upload
      response = _upload_single_image(request)
    else:
      response = {
        'content': _('Only GET or POST are allowed when ID is NOT provided'),
        'status': 405
      }
  else:
    if request.method == 'GET':
      response = _get_single_image(request, id)
    elif request.method == 'DELETE':
      response = _remove_single_image(request, id)
    else:
      response = {
        'content': _('Only GET or DELETE are allowed when ID is provided'),
        'status': 405
      }

  return HttpResponse(**response)


def _upload_single_image(request):
  '''
  Enables to upload image coming in the POST payload
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
        'html': render_to_string('images/images_in_gallery.html', { 'images': [ form.instance ] }, request)
      }),
      "content_type": "application/json"
    }
  else:
    response = {
      'status': 400,
      'content': str(form.errors)
    }

  return response


def _list_images(request):
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
  offset = int(request.GET.get('offset', 0))
  max_count = int(request.GET.get('max_count', -1))

  qs_images = UserPhotos.objects.order_by('label', 'upload_date')
  images = qs_images[offset:offset+max_count] if (max_count > 0) else qs_images[offset:]
  images_mixim = render_to_string('images/images_in_gallery.html', { 'images': images }, request)

  return {
    'content': json.dumps({
      'offset': offset,
      'max_count': max_count,
      'total_count': qs_images.count(),
      'html': images_mixim,
    }),
    'content_type': 'application/json',
    'status': 200
  }
  

def _get_single_image(request, id):
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


def _remove_single_image(request, id):
  '''
  Removes image with given id
  '''
  image = UserPhotos.objects.filter(id=id).delete()
  return {
    'content': json.dumps({
      
    }),
    'content_type': 'application/json',
    'status': 200
  }
