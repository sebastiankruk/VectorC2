import json

from django.http import HttpResponseRedirect, HttpResponse
from django.utils.translation import gettext as _
from django.shortcuts import render
from django.template.loader import render_to_string

from photos.forms import UploadFileForm
from photos.models import UserPhotos



def upload(request):
  """
  This view will handle uploading of the new photos to the collection
  More info at: https://docs.djangoproject.com/en/2.2/topics/http/file-uploads/
  """
  if request.method == 'POST':
    form = UploadFileForm(data=request.POST, files=request.FILES)
    if form.is_valid():
      form.save()
      response = {
        'status': 200,
        'content': json.dumps({
          'id': form.instance.id,
          'image': form.instance.image.name,
          'label': form.instance.label
        }),
        "content_type": "application/json"
      }
    else:
      response = {
        'status': 400,
        'content': str(form.errors)
      }
  else:
    response = {
      'status': 405,
      'content': _('Only POST is allowed')
    }

  return HttpResponse(**response)



def list_photos(request):
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
      'photos': 'HTML mixim'
    }
    'status': $http_status_code
  } 
  """
  if request.method == 'GET':
    offset = int(request.GET.get('offset', 0))
    max_count = int(request.GET.get('max_count', -1))

    qs_photos = UserPhotos.objects.order_by('label', 'upload_date')
    photos = qs_photos[offset:max_count] if (max_count > 0) else qs_photos[offset:]
    photos_mixim = render_to_string('photos/photos_in_gallery.html', { 'photos': photos }, request)

    response = {
      'content': json.dumps({
        'offset': offset,
        'max_count': max_count,
        'count': qs_photos.count(),
        'photos': photos_mixim,
      }),
      'content_type': 'application/json',
      'status': 200
    }
  else:
    response = {
      'content': _('Only POST is allowed'),
      'status': 405
    }

  return HttpResponse(**response)
  


def delete(request):
  pass