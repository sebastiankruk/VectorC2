from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from photos.forms import UploadFileForm

def upload(request):
  """
  This view will handle uploading of the new photos to the collection
  """
  if request.method == 'POST':
    form = UploadFileForm(data=request.POST, files=request.FILES)
    if form.is_valid():
      # form.save()
      print('valid form')
    else:
      print('invalid form')
      print(form.errors)

  return HttpResponse('Done')
  # return HttpResponseRedirect('/photos/uploaded') 
