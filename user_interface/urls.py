from django.urls import path
from user_interface.views import *
from django.urls import re_path


urlpatterns = [
    re_path('user/sign_up?$', user_creation),
    re_path('user/log_in?$', user_auth),
    re_path('user/?$', user_get),
    re_path('information/?$',Information_creation),
    path('information/<pk>',Information_byId),
    re_path('education/?$',Education_creation),
    path('education/<user>',Education_byId),
    re_path('experience/?$',Experience_creation),
    path('experience/<user>',Experience_byId),
    re_path('skills/?$',Skills_creation),
    path('skills/<user>',Skill_byId),
    re_path('project/?$',Project_creation),
    path('project/<pk>',Project_byId),
]
