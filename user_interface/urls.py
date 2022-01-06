from django.urls import path
from user_interface.views import *
from django.urls import re_path


urlpatterns = [
    re_path('user/sign_up?$', user_creation),
    re_path('user/log_in?$', user_auth),
    re_path('user/?$', user_get)
]
