import json

from django.http import HttpResponseRedirect, HttpResponse
from django.utils.translation import gettext as _

from photos.forms import UploadFileForm

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

def list(request):
  pass

def delete(request):
  pass