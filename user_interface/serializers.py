"""
Module containing serealizer class
"""


from rest_framework import serializers
from user_interface.models import User, Information, Education, Experience, Skill, Project, Message

class UserSerializer(serializers.ModelSerializer):
    """
    Class to serialize user objects
    """

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']

class InformationSerializer(serializers.ModelSerializer):
    """
    Class to serialize user user information
    """
    class Meta:
        model = Information
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    """
    Class to serialize user user Education
    """
    class Meta:
        model = Education
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    """
    Class to serialize user user Experience
    """
    class Meta:
        model = Experience
        fields = '__all__'

class SkillsSerializer(serializers.ModelSerializer):
    """
    Class to serialize user user Skills
    """

    class Meta:
        model = Skill
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    """
    Class to serialize user user Project
    """

    class Meta:
        model = Project
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    """
    Class to serialize user user Messages
    """

    class Meta:
        model = Message
        fields = '__all__'
