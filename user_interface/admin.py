from django.contrib import admin
from .models import (
    User,
    Information,
    Education,
    Experience,
    Skill,
    Project,
    Message
)

admin.site.register(User)
admin.site.register(Information)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(Message)
