from django.http import Http404
from django.shortcuts import render

# from .models import Question
# ...
def home(request):
    # try:
    #     question = Question.objects.get(pk=question_id)
    # except Question.DoesNotExist:
    #     raise Http404("Question does not exist")
    # return render(request, 'webview/page.html')    
    return render(request, 'webview/index.html')    