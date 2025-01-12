from django.core.management.base import BaseCommand
from course_allocation.models import Teacher, Course

class Command(BaseCommand):
    help = 'Populate the database with sample data for course allocation'

    def handle(self, *args, **kwargs):
        teachers = [
            {"name": "Teacher A", "role": "regular", "expertise": ["Course 1", "Course 2"], "preferences": ["Course 1"]},
            {"name": "Teacher B", "role": "hod", "expertise": ["Course 2", "Course 3"], "preferences": ["Course 2"]},
        ]
        for teacher_data in teachers:
            teacher, created = Teacher.objects.get_or_create(name=teacher_data["name"])
            teacher.role = teacher_data["role"]
            teacher.expertise = teacher_data["expertise"]
            teacher.preferences = teacher_data["preferences"]
            teacher.save()

        courses = [
            {"name": "Course 1", "credit_hours": 3, "is_lab": False},
            {"name": "Course 2", "credit_hours": 3, "is_lab": True},
        ]
        for course_data in courses:
            course, created = Course.objects.get_or_create(
                name=course_data["name"],
                defaults={"credit_hours": course_data["credit_hours"], "is_lab": course_data["is_lab"]}
            )
            if not created:
                course.credit_hours = course_data["credit_hours"]
                course.is_lab = course_data["is_lab"]
                course.save()

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with sample data'))