"""
Module containing the endpoint views for the API
"""


from django.http.response import JsonResponse
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from user_interface.models import User, Information, Education, Experience, Skill, Project, Message
from user_interface.serializers import UserSerializer, InformationSerializer, EducationSerializer, ExperienceSerializer, SkillsSerializer, ProjectSerializer, MessageSerializer
from rest_framework.decorators import api_view
from django.db import IntegrityError
from django.core.mail import send_mail


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

@api_view()
def user_byId(request, pk):

    try:
        user = User.objects.get(id=pk)
    except User.DoesNotExist:
        return JsonResponse(
                            {'message': 'The element does not exist'},
                            status=status.HTTP_404_NOT_FOUND
                            )
    if (request.method == 'GET'):
        user_serializer = UserSerializer(
            user,
        )
        return JsonResponse(
                            user_serializer.data,
                            status = status.HTTP_200_OK,
                            safe=False
                            )

# form views

# Information Views

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

@api_view(['GET'])
def Information_byUser(request, user):
    try:
        information = Information.objects.get(user=user)
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

@api_view(['DELETE', 'PUT'])
def Information_byId(request, pk):
    try:
        information = Information.objects.get(id=pk)
        data = request.data
    except Information.DoesNotExist:
        return JsonResponse(
                            {'message': 'The element does not exist'},
                            status=status.HTTP_404_NOT_FOUND
                            )
    if (request.method == 'DELETE'):
        information.delete()
        return JsonResponse(
                            {'message': 'Successfully deleted'}
                            )
    if (request.method == 'PUT'):
        information_serialized = InformationSerializer(information, data)
        if information_serialized.is_valid():
            information_serialized.save()
            return JsonResponse(information_serialized.data)
        return JsonResponse(
                            information_serialized.errors,
                            status=status.HTTP_404_NOT_FOUND
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

@api_view(['DELETE', 'PUT', 'GET'])
def Education_byUser(request, user):
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

@api_view(['DELETE', 'PUT', 'GET'])
def Education_byId(request, id):
    try:
        education = Education.objects.filter(id=id)
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

@api_view(['DELETE', 'PUT', 'GET'])
def Experience_byUser(request, user):
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

@api_view(['DELETE', 'PUT', 'GET'])
def Experience_byId(request, id):
    try:
        experience = Experience.objects.filter(id=id)
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

@api_view(['DELETE', 'PUT', 'GET'])
def Skill_byUser(request, user):
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

@api_view(['DELETE', 'PUT', 'GET'])
def Skill_byId(request, id):
    try:
        skill = Skill.objects.filter(id=id)
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

@api_view(['DELETE', 'PUT', 'GET'])
def Project_byUser(request, user):
    try:
        project = Project.objects.filter(user=user)
    except Project.DoesNotExist:
        return JsonResponse(
                            {'message': 'The element does not exist'},
                            status=status.HTTP_404_NOT_FOUND
                            )
    if (request.method == 'GET'):
        project_serialized = ProjectSerializer(
            project,
            many=True
        )
        return JsonResponse(
                            project_serialized.data,
                            status = status.HTTP_200_OK,
                            safe=False
                            )
    if (request.method == 'DELETE'):
        project.delete()
        return JsonResponse(
                            {'message': 'Successfully deleted'}
                            )

@api_view(['DELETE', 'PUT', 'GET'])
def Project_byId(request, id):
    try:
        project = Project.objects.filter(id=id)
    except Project.DoesNotExist:
        return JsonResponse(
                            {'message': 'The element does not exist'},
                            status=status.HTTP_404_NOT_FOUND
                            )
    if (request.method == 'GET'):
        project_serialized = ProjectSerializer(
            project,
            many=True
        )
        return JsonResponse(
                            project_serialized.data,
                            status = status.HTTP_200_OK,
                            safe=False
                            )
    if (request.method == 'DELETE'):
        project.delete()
        return JsonResponse(
                            {'message': 'Successfully deleted'}
                            )

# Send message

@api_view(['POST', 'GET'])
def Message_received(request):

    if request.method == 'POST':
        data = request.data

        userEmail = data['userEmail']
        data.pop('userEmail')
        user = User.objects.get(email=userEmail)
        data['user'] = user.id

        message_serializer = MessageSerializer(data=data)
        if message_serializer.is_valid():
            message_serializer.save()
            return JsonResponse(
                    message_serializer.data,
                    status=status.HTTP_200_OK,
                    safe=False
                    )

        return JsonResponse(
                    message_serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST,
                    safe=False
                    )
    if request.method == 'GET':
        message = Message.objects.all()
        message_serializer = MessageSerializer(
            message,
            many=True
        )

        return JsonResponse(
            message_serializer.data,
            status = status.HTTP_200_OK,
            safe=False
            )