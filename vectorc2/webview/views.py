#  Copyright 2019 Sebastian Ryszard Kruk <vectorc2@kruk.me>
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
from django.http import Http404
from django.shortcuts import render
from django.template.context import RequestContext

from command.models import Configuration
from images.forms import UploadFileForm
from images.models import UserPhotos

from django.template.context_processors import media

def home(request):
    return render(request, 
                  'webview/index.html',
                   {
                    'frequency': Configuration.get_value('status_checking_frequency', 0),
                    'images_form': UploadFileForm() if request.method == 'GET' else None,
                    'images':  UserPhotos.objects.all() 
                  })