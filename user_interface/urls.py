from django.urls import path
from user_interface.views import *
from django.urls import re_path


urlpatterns = [
    re_path('user/sign_up?$', user_creation),
    re_path('user/log_in?$', user_auth),
    re_path('user/?$', user_get),
    re_path('information/?$',Information_creation),
    re_path('education/?$',Education_creation),
    re_path('experience/?$',Experience_creation),
    re_path('skills/?$',Skills_creation)
]
