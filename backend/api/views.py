from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Instructor
from .serializers import GenericUserSerializer, GenericUserLoginSerializer, InstructorCreateSerializer, InstructorUpdateSerializer

from rest_framework.views import APIView
# import subprocess
from django.core.management import call_command
from django.db import IntegrityError

class InstructorRegisterView(generics.CreateAPIView):
    queryset = Instructor.objects.all()
    serializer_class = InstructorCreateSerializer
    permission_classes = [AllowAny]

    def transform_user_format(self, imp_data):
        if isinstance(imp_data, dict) and 'name' in imp_data and 'email' in imp_data and 'password' in imp_data:
            return {'user': imp_data}
        return imp_data

    def create(self, request, *args, **kwargs):
        request_data = request.data
        transformed_data = self.transform_user_format(imp_data=request_data)
        serializer = self.get_serializer(data=transformed_data)
        serializer.is_valid(raise_exception=True)
        instructor = serializer.save()
        refresh = RefreshToken.for_user(instructor.user)

        print("--cs--", request_data, "\n-", transformed_data)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            # 'user': GenericUserLoginSerializer(user.user).data,
        }, status=status.HTTP_201_CREATED)

class InstructorLoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = GenericUserLoginSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        instructor_user = Instructor.objects.filter(user__email=email).first()
        if instructor_user and instructor_user.user.check_password(password):
            refresh = RefreshToken.for_user(instructor_user.user)
            user_data = GenericUserSerializer(instructor_user.user).data
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user_data['id'],
                    'email': user_data['email'],
                    'name': user_data['name'],
                    'is_active': user_data['is_active'],
                    'user_type': user_data['user_type'],
                },
            })
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class InstructorProfileView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Instructor.objects.all()
    permission_classes = (IsAuthenticated,)  # Ensure the user is authenticated
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return InstructorUpdateSerializer
        # You can return InstructorCreateSerializer for POST request if needed
        # return InstructorUpdateSerializer  # Modify this line as per your needs

    def get_object(self):
        # Get the Instructor object by primary key from URL
        return Instructor.objects.get(pk=self.kwargs['pk'])
    
    def delete(self, request, *args, **kwargs):
        # Delete the instructor profile
        instructor = self.get_object()
        instructor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  # 204 No Content to indicate successful deletion
    

class FeedFactoryData(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            # Return a success response
            return Response({'message': 'Data populated successfully.'}, status=200)
        except IntegrityError as e:
            # Handle duplicate value error (or other integrity issues)
            return Response({'error': str(e)}, status=400)
        
        except Exception as e:
            # Handle any exceptions
            return Response({'error': str(e)}, status=500)
        
class DbDataHandle(APIView):
    permission_classes = [AllowAny]
    fileName = 'backup.json'

    def get(self, request, *args, **kwargs):
        return Response(
            {"message": "GET request not allowed. Use POST to save <database>.json file & PUT to load data from <database>.json"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def post(self, request, *args, **kwargs):
        try:
            with open(self.fileName, 'w') as output_file:
                call_command('dumpdata', '--exclude', 'auth.permission', '--exclude', 'contenttypes', stdout=output_file)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'message': 'Database backed up successfully.'}, status=status.HTTP_201_CREATED)


    def patch(self, request, *args, **kwargs):
        try:
            with open(self.fileName, 'r') as input_file:
                call_command('loaddata', input_file.name)
        except FileNotFoundError:
            return Response({'error': 'Backup file not found.'}, status=status.HTTP_404_NOT_FOUND)
        except IOError as e:
            return Response({'error': f'IO error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': f'An unexpected error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'message': 'Data loaded successfully.'}, status=status.HTTP_200_OK)
    

    def put(self, request, *args, **kwargs):
        try:
            call_command('flush', '--no-input')
        except Exception as e:
            return Response({'error': f'An unexpected error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'message': 'Data loaded successfully.'}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        try:
            call_command('flush', '--no-input')
        except Exception as e:
            return Response({'error': f'An unexpected error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'message': 'Data loaded successfully.'}, status=status.HTTP_200_OK)