from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Instructor
from .serializers import GenericUserSerializer, GenericUserLoginSerializer, InstructorCreateSerializer, InstructorUpdateSerializer

from rest_framework.views import APIView
# import subprocess
from django.core.management import call_command

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
            # Path to your Python script
            # script_path = './api/management/commands/populate_data-real.py'

            # Execute the script using subprocess
            # result = subprocess.run(['python', script_path], capture_output=True, text=True, check=True)

            # Get the script output and errors
            # output = result.stdout
            # errors = result.stderr

            call_command('populate_data-real')


            # Return the response in JSON format
            # return Response({'output': output, 'errors': errors}, status=200)

            # Return a success response
            return Response({'message': 'Data populated successfully.'}, status=200)


        # except subprocess.CalledProcessError as e:
        #     return Response({'error': f'An error occurred: {e.stderr}'}, status=500)

        
        except Exception as e:
            # Handle any exceptions
            return Response({'error': str(e)}, status=500)