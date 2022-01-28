from django.urls import path
from user_interface.views import *
from django.urls import re_path


urlpatterns = [
    re_path('user/sign_up?$', user_creation),
    re_path('user/log_in?$', user_auth),
    re_path('user/?$', user_get),
    path('user/<pk>',user_byId),
    re_path('information/?$',Information_creation),
    path('user/information/<user>',Information_byUser),
    path('information/<pk>',Information_byId),
    re_path('education/?$',Education_creation),
    path('education/<user>',Education_byId),
    re_path('experience/?$',Experience_creation),
    path('experience/<user>',Experience_byId),
    re_path('skills/?$',Skills_creation),
    path('skills/<user>',Skill_byId),
    re_path('project/?$',Project_creation),
    path('project/<user>',Project_byId),
    re_path('message/?$',Message_received),
]
