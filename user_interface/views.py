"""
Module containing the endpoint views for the API
"""


from django.http.response import JsonResponse
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from user_interface.models import User, Information, Education, Experience, Skill, Project
from user_interface.serializers import UserSerializer, InformationSerializer, EducationSerializer, ExperienceSerializer, SkillsSerializer, ProjectSerializer
from rest_framework.decorators import api_view
from django.db import IntegrityError


# User views

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

    if request.method == 'GET':
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

# form views

@api_view(['GET', 'POST'])
def Information_creation(request):

    if request.method == 'POST':
        data = request.data
        userEmail = data['userEmail']
        data.pop('userEmail')
        user = User.objects.get(email=userEmail)
        data['user'] = user.id

        information_serializer = InformationSerializer(data=data)
        if information_serializer.is_valid():
            information_serializer.save()
            return JsonResponse(
                    information_serializer.data,
                    status=status.HTTP_201_CREATED,
                    safe=False
                    )
        print(information_serializer.errors)
        return JsonResponse(
                    information_serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST,
                    safe=False
                    )
    elif request.method == 'GET':
        information = Information.objects.all()
        information_serialized = InformationSerializer(
        information,
        many=True
        )

        return JsonResponse(
            information_serialized.data,
            status = status.HTTP_200_OK,
            safe=False
            )

@api_view(['DELETE', 'UPDATE', 'GET'])
def Information_byId(request, pk):
    try:
        information = Information.objects.get(user=pk)
    except Information.DoesNotExist:
        return JsonResponse(
                            {'message': 'The element does not exist'},
                            status=status.HTTP_404_NOT_FOUND
                            )
    if (request.method == 'GET'):
        information_serialized = InformationSerializer(
            information,
        )
        return JsonResponse(
                            information_serialized.data,
                            status = status.HTTP_200_OK,
                            safe=False
                            )
    if (request.method == 'DELETE'):
        information.delete()
        return JsonResponse(
                            {'message': 'Successfully deleted'}
                            )

# Education views

@api_view(['GET', 'POST'])
def Education_creation(request):

    if request.method == 'GET':
        education = Education.objects.all()
        education_serialized = EducationSerializer(
            education,
            many=True
        )

        return JsonResponse(
            education_serialized.data,
            status = status.HTTP_200_OK,
            safe=False
            )

    if request.method == 'POST':
        data = request.data
        userEmail = data['userEmail']
        data.pop('userEmail')
        user = User.objects.get(email=userEmail)
        data['user'] = user.id

        education_serialized = EducationSerializer(data=data)
        if education_serialized.is_valid():
            education_serialized.save()
            return JsonResponse(
                    education_serialized.data,
                    status=status.HTTP_200_OK,
                    safe=False
                    )

        return JsonResponse(
                    education_serialized.errors,
                    status=status.HTTP_400_BAD_REQUEST,
                    safe=False
                    )

@api_view(['DELETE', 'UPDATE', 'GET'])
def Education_byId(request, user):
    try:
        education = Education.objects.filter(user=user)
    except Education.DoesNotExist:
        return JsonResponse(
                            {'message': 'The element does not exist'},
                            status=status.HTTP_404_NOT_FOUND
                            )
    if (request.method == 'GET'):
        education_serialized = EducationSerializer(
            education,
            many=True
        )
        return JsonResponse(
                            education_serialized.data,
                            status = status.HTTP_200_OK,
                            safe=False
                            )
    if (request.method == 'DELETE'):
        education.delete()
        return JsonResponse(
                            {'message': 'Successfully deleted'}
                            )

# Experience views

@api_view(['GET', 'POST'])
def Experience_creation(request):

    if request.method == 'GET':
        experience = Experience.objects.all()
        experience_serialized = ExperienceSerializer(
            experience,
            many=True
        )

        return JsonResponse(
            experience_serialized.data,
            status = status.HTTP_200_OK,
            safe=False
            )

    if request.method == 'POST':
        data = request.data
        userEmail = data['userEmail']
        data.pop('userEmail')
        user = User.objects.get(email=userEmail)
        data['user'] = user.id

        experience_serialized = ExperienceSerializer(data=data)
        if experience_serialized.is_valid():
            experience_serialized.save()
            return JsonResponse(
                    experience_serialized.data,
                    status=status.HTTP_200_OK,
                    safe=False
                    )

        return JsonResponse(
                    experience_serialized.errors,
                    status=status.HTTP_400_BAD_REQUEST,
                    safe=False
                    )

@api_view(['DELETE', 'UPDATE', 'GET'])
def Experience_byId(request, user):
    try:
        experience = Experience.objects.filter(user=user)
    except Experience.DoesNotExist:
        return JsonResponse(
                            {'message': 'The element does not exist'},
                            status=status.HTTP_404_NOT_FOUND
                            )
    if (request.method == 'GET'):
        experience_serialized = ExperienceSerializer(
            experience,
            many=True
        )
        return JsonResponse(
                            experience_serialized.data,
                            status = status.HTTP_200_OK,
                            safe=False
                            )
    if (request.method == 'DELETE'):
        experience.delete()
        return JsonResponse(
                            {'message': 'Successfully deleted'}
                            )

# Skills views

@api_view(['GET', 'POST'])
def Skills_creation(request):

    if request.method == 'GET':
        skills = Skill.objects.all()
        skills_serializer = SkillsSerializer(
            skills,
            many=True
        )

        return JsonResponse(
            skills_serializer.data,
            status = status.HTTP_200_OK,
            safe=False
            )

    if request.method == 'POST':
        data = request.data
        userEmail = data['userEmail']
        data.pop('userEmail')
        user = User.objects.get(email=userEmail)
        data['user'] = user.id

        skills_serializer = SkillsSerializer(data=data)
        if skills_serializer.is_valid():
            skills_serializer.save()
            return JsonResponse(
                    skills_serializer.data,
                    status=status.HTTP_200_OK,
                    safe=False
                    )

        return JsonResponse(
                    skills_serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST,
                    safe=False
                    )

@api_view(['DELETE', 'UPDATE', 'GET'])
def Skill_byId(request, user):
    try:
        skill = Skill.objects.filter(user=user)
    except Skill.DoesNotExist:
        return JsonResponse(
                            {'message': 'The element does not exist'},
                            status=status.HTTP_404_NOT_FOUND
                            )
    if (request.method == 'GET'):
        skills_serialized = SkillsSerializer(
            skill,
            many=True
        )
        return JsonResponse(
                            skills_serialized.data,
                            status = status.HTTP_200_OK,
                            safe=False
                            )
    if (request.method == 'DELETE'):
        skill.delete()
        return JsonResponse(
                            {'message': 'Successfully deleted'}
                            )

# Projects views

@api_view(['GET', 'POST'])
def Project_creation(request):

    if request.method == 'GET':
        project = Project.objects.all()
        project_serializer = ProjectSerializer(
            project,
            many=True
        )

        return JsonResponse(
            project_serializer.data,
            status = status.HTTP_200_OK,
            safe=False
            )

    if request.method == 'POST':
        data = request.data
        print(data)
        # dataCopy = data.copy()
        userEmail = data['userEmail']
        data.pop('userEmail')
        user = User.objects.get(email=userEmail)
        data['user'] = user.id

        project_serializer = ProjectSerializer(data=data)
        if project_serializer.is_valid():
            project_serializer.save()
            return JsonResponse(
                    project_serializer.data,
                    status=status.HTTP_200_OK,
                    safe=False
                    )

        return JsonResponse(
                    project_serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST,
                    safe=False
                    )

@api_view(['DELETE', 'UPDATE'])
def Project_byId(request, pk):
    try:
        project = Project.objects.get(id=pk)
    except Project.DoesNotExist:
        return JsonResponse(
                            {'message': 'The element does not exist'},
                            status=status.HTTP_404_NOT_FOUND
                            )
    if (request.method == 'DELETE'):
        project.delete()
        return JsonResponse(
                            {'message': 'Successfully deleted'}
                            )
