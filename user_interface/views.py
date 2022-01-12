"""
Module containing the endpoint views for the API
"""


from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from user_interface.models import *
from user_interface.serializers import UserSerializer
from rest_framework.decorators import api_view
from django.db import IntegrityError


@api_view(['POST'])
def user_creation(request):

    data = request.data
    username = (data['email'].split('@'))[0]
    try:
        user = User.objects.create_user(
            username=username,
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email']
            )

        user_serializer = UserSerializer(user)
        return JsonResponse(
                user_serializer.data,
                status=status.HTTP_201_CREATED,
                safe=False
                )

    except IntegrityError:
        return JsonResponse(
            {'message': 'email already registerd'},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
def user_auth(request):

    data = request.data
    username = (data['email'].split('@'))[0]
    user = authenticate(
        username=username,
        password=data['password']
        )

    if user is not None:
        user_serializer = UserSerializer(user)
        return JsonResponse(
            user_serializer.data,
            status=status.HTTP_200_OK,
            safe=False
        )
    else:
        return JsonResponse(
            {'message': 'User is not registered'},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view()
def user_get(request):

    users = User.objects.all()
    users_serialized = UserSerializer(
        users,
        many=True
        )

    return JsonResponse(
        users_serialized.data,
        status = status.HTTP_200_OK,
        safe=False
        )
