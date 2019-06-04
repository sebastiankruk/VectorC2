from django import forms

from photos.models import UserPhotos

class UploadFileForm(forms.ModelForm):
    image = forms.ImageField()
    label = forms.CharField(max_length=30)

    class Meta:
        model = UserPhotos
        fields = ['image', 'label']
