from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api import models as api_models
from course_allocation import models as course_models
import random

GenericUserModel = get_user_model()

class Command(BaseCommand):
    help = 'Populate the database with sample data for course allocation'

    def handle(self, *args, **kwargs):
        # Sample data for sections
        sections = ["A", "B", "C"]
        for section_name in sections:
            section, created = course_models.Section.objects.get_or_create(name=section_name)
            section.save()

        authorities = ["HOD", "Program Manager", "Timetable Manager"]
        for authority_name in authorities:
            authority, created = api_models.Authority.objects.get_or_create(authority=authority_name)
            authority.save()

        # Sample data for semesters
        ids = ["1", "3", "5", "7"]
        # is_active = [True, True, True, True]
        semesters = ["1st", "3rd", "5th", "7th"]
        for semester_no, semester_count in zip(ids, semesters):
            has_sections = random.randint(1, 3)  # Randomly assign 1 to 3 sections per semester
            semester, created = course_models.Semester.objects.get_or_create(count=semester_count, defaults={'id': semester_no, 'has_sections': has_sections})
            semester.save()

        courses = [
            {"code": "SE101", "name": "Introduction to Software Engineering", "credit_hours": 2, "abbr": "ISE"},
            {"code": "CS102", "name": "Data Structures & Algorithms", "credit_hours": 2, "abbr": "DSA"},
            {"code": "DB104", "name": "Database Management Systems", "credit_hours": 3, "abbr": "DBMS"},
            {"code": "OS105", "name": "Operating Systems", "credit_hours": 2, "abbr": "OS"},
            {"code": "CN106", "name": "Computer Networks Theory", "credit_hours": 3, "abbr": "CN"},
            {"code": "CN107", "name": "Computer Networks Lab", "credit_hours": 1, "abbr": "CN Lab"},
            {"code": "AI107", "name": "Artificial Intelligence", "credit_hours": 3, "abbr": "AI"},
            {"code": "WD108", "name": "Web Engineering Theory", "credit_hours": 3, "abbr": "WE"},
            {"code": "WD109", "name": "Web Engineering Lab", "credit_hours": 1, "abbr": "WE Lab"},
            {"code": "MC109", "name": "Mobile Computing", "credit_hours": 2, "abbr": "MC"},
            {"code": "SPM110", "name": "Software Project Management", "credit_hours": 3, "abbr": "SPM"},
        ]

        # Sample data for instructors
        instructors = ["Ahmad", "Ayesha", "Bilal", "Fatima", "Hassan", "Khadija", "Mohammad", "Nadia", "Omar", "Zainab"]
        for i, instructor_name in enumerate(instructors):
            user_data = {
                'email': f'{instructor_name.lower()}@fusst.com',
                'name': instructor_name,
                # 'user_type': 'ins',
                'password': 'password123'
            }
            user = GenericUserModel.objects.create_user(**user_data)
            instructor, created = api_models.Instructor.objects.get_or_create(user=user)
            rand_choice = random.sample(range(len(courses)), random.randint(0, len(courses)//2))
            instructor.expertise = [courses[idx]["name"] for idx in rand_choice]
            rand_choice = random.sample(range(len(courses)), random.randint(0, len(courses)//2))
            instructor.course_preferences = [courses[idx]["name"] for idx in rand_choice]
            if i < len(authorities):
                instructor.authority = api_models.Authority.objects.get(authority=authorities[i])
            instructor.save()


        for course_data in courses:
            course, created = course_models.Course.objects.get_or_create(
                code=course_data["code"],
                defaults={  # Setting the default values for fields
                    "name": course_data["name"],
                    "credit_hours": course_data["credit_hours"],
                    "abbr": course_data["abbr"],
                }
            )
            semesters_choice = course_models.Semester.objects.all()
            rand_choice = random.sample(list(semesters_choice), random.randint(1, 2))
            course.crs_for_semesters_id.set(rand_choice)
            course.crs_coordinator_id = random.choice(api_models.Instructor.objects.all())
            
            # If the course was already created, we update the fields
            if not created:
                course.name = course_data["name"]
                course.credit_hours = course_data["credit_hours"]
                course.abbr = course_data["abbr"]
                course.save()


        # Create classes and assign random sections to semesters based on has_sections
        for semester in course_models.Semester.objects.all():
            for section in course_models.Section.objects.all()[:semester.has_sections]:
                class_instance, created = course_models.Class.objects.get_or_create(
                    class_semester_id=semester,
                    class_section_id=section,
                    defaults={'course_advisor_id': random.choice(api_models.Instructor.objects.all())}
                )
                class_instance.save()

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with sample data'))