from django import forms

class UploadFileForm(forms.Form):
    image = forms.ImageField()
    label = forms.CharField(max_length=30)
