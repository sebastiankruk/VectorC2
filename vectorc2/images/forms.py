from django import forms

from images.models import UserPhotos

class UploadFileForm(forms.ModelForm):
    image = forms.ImageField()
    label = forms.CharField(max_length=30, widget=forms.TextInput(attrs={
        'placeholder': 'Image name',
        'class': 'form-control'
    }))

    class Meta:
        model = UserPhotos
        fields = ['image', 'label']
