"""
Module containing serealizer class
"""


from rest_framework import serializers
from user_interface.models import User

class UserSerializer(serializers.ModelSerializer):
    """
    Class to serialize user objects
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']
