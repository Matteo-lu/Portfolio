from django.db import models
from django.contrib.auth.models import AbstractUser

RATING_RANGE = (
    ("1", "1"),
    ("2", "2"),
    ("3", "3"),
    ("4", "4"),
    ("5", "5"),
)

class User(AbstractUser):
    pass

class Information(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=54, blank=True, null=True)
    title = models.CharField(max_length=500, blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    Location = models.CharField(max_length=254, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    avatar = models.ImageField(upload_to="avatar/", blank=True, null=True)
    cv = models.FileField(upload_to="cv/", blank=True, null=True)

    # Social
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)

    def __str__(self) -> str:
        return super().__str__()

class Education(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=54, blank=True, null=True)
    education_year = models.IntegerField(blank=True, null=True)
    institute = models.CharField(max_length=200, blank=True, null=True)
    education_description = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-education_year']

    def __str__(self) -> str:
        return super().__str__()

class Experience(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=54, blank=True, null=True)
    experience_year = models.IntegerField(blank=True, null=True)
    company = models.CharField(max_length=54, blank=True, null=True)
    experience_description = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-experience_year']

    def __str__(self) -> str:
        return super().__str__()

class Skill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skill_name = models.CharField(max_length=54, blank=True, null=True)
    skill_level = models.IntegerField(blank=True, null=True)

    class Meta:
        ordering = ['-skill_level']

    def __str__(self) -> str:
        return super().__str__()

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=54, blank=True, null=True)
    project_image = models.ImageField(upload_to="avatar/", blank=True, null=True)
    demo_link = models.URLField(blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return super().__str__()

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=54, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    subject = models.CharField(max_length=1000, blank=True, null=True)
    send_time = models.DateField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-send_time']

    def __str__(self) -> str:
        return super().__str__()
