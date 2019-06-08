from django import forms

from photos.models import UserPhotos

class UploadFileForm(forms.ModelForm):
    image = forms.ImageField(attrs={

    })
    label = forms.CharField(max_length=30, attrs={
        'class': 'form-control-file'
    })

    class Meta:
        model = UserPhotos
        fields = ['image', 'label']
