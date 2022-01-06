from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    User,
    Information,
    Education,
    Experience,
    Skill,
    Project,
    Message
)

admin.site.register(User, UserAdmin)
admin.site.register(Information)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(Message)
