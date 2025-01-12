from rest_framework import serializers
from .models import Authority, Semester, Section, Instructor, Course, Class, Lecture
from api.serializers import GenericUserSerializer

class AuthoritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Authority
        fields = '__all__'

class InstructorSerializer(serializers.ModelSerializer):
    user = GenericUserSerializer()

    class Meta:
        model = Instructor
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Instructor
        fields = ['name', 'expertise', 'preferences', 'instr_authority_id', 'taken_credit_hours', 'password']

    def create(self, validated_data):
        instructor = Instructor.objects.create_user(
            name=validated_data['name'],
            expertise=validated_data['expertise'],
            preferences=validated_data['preferences'],
            instr_authority_id=validated_data['instr_authority_id'],
            taken_credit_hours=validated_data['taken_credit_hours'],
            password=validated_data['password']
        )
        return instructor

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    crs_for_semesters_id = SemesterSerializer(many=True)
    crs_coordinator_id = InstructorSerializer()

    class Meta:
        model = Course
        fields = '__all__'

class ClassSerializer(serializers.ModelSerializer):
    class_semester_id = SemesterSerializer()
    class_section_id = SectionSerializer()
    course_advisor_id = InstructorSerializer()

    class Meta:
        model = Class
        fields = '__all__'

class LectureSerializer(serializers.ModelSerializer):
    lec_class_id = ClassSerializer()
    lec_course_id = CourseSerializer()
    lec_instr_id = InstructorSerializer()

    class Meta:
        model = Lecture
        fields = '__all__'