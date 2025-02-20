from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Instructor, Course, Class, Lecture
from .serializers import InstructorSerializer, CourseSerializer, ClassSerializer, LectureSerializer
from .utils import allocate_course, automatic_course_allocation

from rest_framework.exceptions import PermissionDenied

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_instructors(request):
    instructors = Instructor.objects.all()
    serializer = InstructorSerializer(instructors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_courses(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_classes(request):
    classes = Class.objects.all()
    serializer = ClassSerializer(classes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_lectures(request):
    lectures = Lecture.objects.all()
    serializer = LectureSerializer(lectures, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def allocate(request):

    # Check for a custom header 'X-Can-Access'
    custom_header = request.headers.get('X-Can-Access', None)

    # If the header is missing or incorrect, deny the request
    if not custom_header or custom_header != 'Allow-This-Action':
        raise PermissionDenied("You are not allowed to access this resource!")

    data = request.data
    instructor_id = data.get("instructor_id")
    course_id = data.get("course_id")
    class_id = data.get("class_id")
    
    if not instructor_id or not course_id or not class_id:
        return Response({"error": "instructor_id, course_id, and class_id are required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        instructor = Instructor.objects.get(id=instructor_id)
    except Instructor.DoesNotExist:
        return Response({"error": "Instructor not found"}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        course = Course.objects.get(id=course_id)
    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        class_instance = Class.objects.get(id=class_id)
    except Class.DoesNotExist:
        return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)
    
    result = allocate_course(instructor, course, class_instance)
    return Response(result)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def allocate_all_courses(request):
    automatic_course_allocation()
    return Response({"success": "Automatic course allocation completed"})

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])  # Change this to suit your security needs
def instructor_profile_update(request, instructor_id):
    """
    View to update the preferences of an instructor.
    Allows partial updates, meaning not all fields must be provided.
    Only authenticated users can update preferences.
    """
    
    try:
        # Try to find the instructor by ID
        instructor = Instructor.objects.get(id=instructor_id)
    except Instructor.DoesNotExist:
        # If the instructor is not found, return a 404 response
        return Response({'detail': 'Instructor not found'}, status=status.HTTP_404_NOT_FOUND)

    # Use the Instructor serializer to validate and update the data
    serializer = InstructorSerializer(instructor, data=request.data, partial=True)

    if serializer.is_valid():
        # Save the updated data to the database
        serializer.save()

        # Return the updated instructor data in the response for better feedback
        return Response({'detail': 'Instructor preferences updated successfully.', 'instructor': serializer.data}, 
                        status=status.HTTP_200_OK)
    
    # If the serializer is not valid, return a 400 error with the validation errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)