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
    path('user/education/<user>',Education_byUser),
    path('education/<id>',Education_byId),
    re_path('experience/?$',Experience_creation),
    path('user/experience/<user>',Experience_byUser),
    path('experience/<id>',Experience_byId),
    re_path('skills/?$',Skills_creation),
    path('user/skills/<user>',Skill_byUser),
    path('skills/<id>',Skill_byId),
    re_path('project/?$',Project_creation),
    path('user/project/<user>',Project_byUser),
    path('project/<id>',Project_byId),
    re_path('message/?$',Message_received),
]
