# space/views.py
from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

def index(request):
    return render(request, 'space/index.html', {})

def room(request, space_name):
    return render(request, 'space/room.html', {
        'space_name_json': mark_safe(json.dumps(space_name))
})