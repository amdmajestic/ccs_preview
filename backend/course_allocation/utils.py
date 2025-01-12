import logging
from .models import Instructor, Course, Class, Lecture
from django import db

MAX_CREDIT_HOURS_NO_AUTHORITY = 9
MAX_CREDIT_HOURS_WITH_AUTHORITY = 6

logger = logging.getLogger(__name__)

a_flag = True

def check_soft_constraints(instructor, course, class_instance):
    global a_flag
    lectures = Lecture.objects.all()

    if course.name not in instructor.course_preferences:
        if a_flag:
            print("--fault--", "s-1")
        return False
    this_class_and_instructor_lectures = lectures.filter(lec_class_id=class_instance.id, lec_instr_id=instructor.id)
    if this_class_and_instructor_lectures.exists():
        if a_flag:
            print("--fault--", "s-2")
        return False
    return True

def check_hard_constraints(instructor, course, class_instance, assigned_instructor):
    max_credit_hours = MAX_CREDIT_HOURS_WITH_AUTHORITY if instructor.authority and instructor.authority.authority in ["HOD", "Program Manager", "Timetable Manager"] else MAX_CREDIT_HOURS_NO_AUTHORITY

    global a_flag
    if instructor.taken_credit_hours + course.credit_hours > max_credit_hours:
        if a_flag:
            print("--fault--", "h-1")
        return False
    if course.name not in instructor.expertise and assigned_instructor is not None:
        if a_flag:
            print("--fault--", "h-2")
        return False
    if assigned_instructor is not None and instructor.taken_credit_hours >= assigned_instructor.taken_credit_hours:
        if a_flag:
            print("--fault--", "h-3")
        return False
    
    # h-5 ==> if instructor is visiting it can hold crdt_hrs <=9

    # h-6 ==> if instructor is regular it should hold max respectiva crdt_hrs ==6 or ==9
    
    return True

def allocate_course(instructor, course, class_instance):
    # lecture, created = Lecture.objects.update_or_create(
    lecture, created = Lecture.objects.get_or_create(
        lec_class_id=class_instance,
        lec_course_id=course,
        defaults={'lec_instr_id': instructor}
    )
    if instructor:
        instructor.taken_credit_hours += course.credit_hours
        instructor.save()
    if created:
        logger.info(f"New lecture created for course {course.id} assigned to Instructor {instructor.id if instructor else 'None'} for class {class_instance.id}.")
        return {"success": f"New lecture created for course {course.id} assigned to Instructor {instructor.id if instructor else 'None'} for class {class_instance.id}", "lecture_id": lecture.id}
    else:
        logger.info(f"Lecture updated for course {course.id} assigned to Instructor {instructor.id if instructor else 'None'} for class {class_instance.id}.")
        return {"success": f"Lecture updated for course {course.id} assigned to Instructor {instructor.id if instructor else 'None'} for class {class_instance.id}", "lecture_id": lecture.id}

def automatic_course_allocation():
    _clean_postgres_db__tabe(Lecture)
    classes = Class.objects.all()
    courses = Course.objects.all()
    instructors = Instructor.objects.all()
    for instructor in instructors:
        instructor.taken_credit_hours = 0

    global a_flag

    for class_instance in classes:
        for course in courses:
            course_offering_in_semesters_ids = [semester_id for semester_id in course.crs_for_semesters_id.values_list('id', flat=True)]
            # verify soft constraints
            available_instructor_tentative = next((instructor for instructor in instructors if check_soft_constraints(instructor, course, class_instance)), None)
            # verify hard constraints
            available_instructor = next((instructor for instructor in instructors if check_hard_constraints(instructor, course, class_instance, available_instructor_tentative)), None)

            if a_flag:
                # print("--cstm--", class_instance, course, available_instructor, course_offering_in_semesters_ids, (class_instance.class_semester_id.id in course_offering_in_semesters_ids))
                pass

            if available_instructor and class_instance.class_semester_id.id in course_offering_in_semesters_ids:
                allocate_course(available_instructor, course, class_instance)
            else:
                Lecture.objects.update_or_create(
                    lec_class_id=class_instance,
                    lec_course_id=course,
                    defaults={'lec_instr_id': None}
                )
                logger.info(f"No suitable instructor found for course {course.id} in class {class_instance.id}. Lecture created with instructor set to None.")

        a_flag = False


def _clean_postgres_db__tabe(self: db.models.Model = None) -> None:
    try:
        self.objects.all().delete()
        app_name = self._meta.app_label
        model_name = self.__name__
        with db.connection.cursor() as cursor:
            cursor.execute(f"ALTER SEQUENCE {app_name}_{model_name}_{self._meta.pk.name}_{'seq'} RESTART WITH 1;")
        print(f"Model: {self.__name__} is clean Successfully.")
    except Exception as e:
        print(f"Model: {self.__name__} can't be cleaned.\n ``Unexpected error: {e}")