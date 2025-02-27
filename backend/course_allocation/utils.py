import logging
from .models import Instructor, Course, Class, Lecture
from django.db import connection, models

from rest_framework import status

MAX_CREDIT_HOURS_NO_AUTHORITY: int = 9
MAX_CREDIT_HOURS_WITH_AUTHORITY: int = 6
AUTHORITIES: list = ["HOD", "Program Manager", "Timetable Manager"]

a_flag: bool = True

logger: logging = logging.getLogger(__name__)

def check_soft_constraints(instructor: Instructor, course: Course, class_instance: Class, assigned_instructor: Instructor) -> bool:
    global MAX_CREDIT_HOURS_NO_AUTHORITY, MAX_CREDIT_HOURS_WITH_AUTHORITY, AUTHORITIES
    
    # max_allowed_credit_hours = MAX_CREDIT_HOURS_WITH_AUTHORITY if instructor.authority and (instructor.authority.authority in AUTHORITIES) else MAX_CREDIT_HOURS_NO_AUTHORITY
    max_allowed_credit_hours: int = MAX_CREDIT_HOURS_WITH_AUTHORITY if instructor.authority else MAX_CREDIT_HOURS_NO_AUTHORITY
    current_taken_credit_hours: int = instructor.taken_credit_hours + course.credit_hours

    global a_flag
    
    lectures: models.QuerySet[Lecture] = Lecture.objects.all()

    if course.name not in instructor.course_preferences:
        if a_flag:
            print("--fault--", "s-1")
        return False
    if (assigned_instructor is not None) and instructor.taken_credit_hours > assigned_instructor.taken_credit_hours:
        if a_flag:
            print("--fault--", "s-2")
        return False
    # s-3 ==> non-visiting instructor should hold abs respective crdt_hrs ==6 or ==9
    if (not instructor.is_visiting) and (current_taken_credit_hours != max_allowed_credit_hours):
        if a_flag:
            print("--fault--", "s-3")
        return False
    # this_classSection_lectures = lectures.filter(lec_class_id__class_section_id__id=class_instance.class_section_id.id)
    # if this_classSection_lectures.exists():
    #     if a_flag:
    #         print("--fault--", "s-4", this_classSection_lectures.values())
    #     return False
    # this_instructor_lectures = lectures.filter(lec_instr_id__id=instructor.id)
    # if this_instructor_lectures.exists():
    #     if a_flag:
    #         print("--fault--", "s-5", this_instructor_lectures.values())
    #     return False
    # this_class_lectures = lectures.filter(lec_class_id__id=class_instance.id)
    # if this_class_lectures.exists():
    #     if a_flag:
    #         print("--fault--", "s-6", this_class_lectures.values())
    #     return False
    
    return True

def check_hard_constraints(instructor: Instructor, course: Course, class_instance: Class) -> bool:
    global MAX_CREDIT_HOURS_NO_AUTHORITY, MAX_CREDIT_HOURS_WITH_AUTHORITY, AUTHORITIES
    
    # max_allowed_credit_hours = MAX_CREDIT_HOURS_WITH_AUTHORITY if instructor.authority and (instructor.authority.authority in AUTHORITIES) else MAX_CREDIT_HOURS_NO_AUTHORITY
    max_allowed_credit_hours: int = MAX_CREDIT_HOURS_WITH_AUTHORITY if instructor.authority else MAX_CREDIT_HOURS_NO_AUTHORITY
    current_taken_credit_hours: int = instructor.taken_credit_hours + course.credit_hours

    global a_flag
    
    # h-1 ==> if instructor is regular it should hold max respective crdt_hrs <=6 or <=9
    if (not instructor.is_visiting) and (current_taken_credit_hours > max_allowed_credit_hours):
        if a_flag:
            print("--fault--", "h-1")
        return False
    # h-2 ==> if instructor is visiting it can hold crdt_hrs <=9
    if (instructor.is_visiting) and (current_taken_credit_hours > MAX_CREDIT_HOURS_WITH_AUTHORITY):
        if a_flag:
            print("--fault--", "h-2")
        return False
    if course.name not in instructor.expertise:
        if a_flag:
            print("--fault--", "h-3")
        return False
    
    return True

def allocate_course(course: Course, class_instance: Class, instructor: Instructor = None, assigned_instructor: Instructor = None) -> None:
    
    def allocate_course_with_instructor():
        # lecture, created = Lecture.objects.get_or_create(
        lecture, created = Lecture.objects.update_or_create(
            lec_class_id=class_instance,
            lec_course_id=course,
            defaults={'lec_instr_id': instructor}
        )
        if assigned_instructor and instructor.id != assigned_instructor.id:
            assigned_instructor.taken_credit_hours -= course.credit_hours
            assigned_instructor.save()
        if instructor:
            instructor.taken_credit_hours += course.credit_hours
            instructor.save()

        if created:
            logger.info(f"New lecture created for course {course.id} assigned to Instructor {instructor.id if instructor else 'None'} for class {class_instance.id}.")
            return {"success": f"New lecture created for course {course.id} assigned to Instructor {instructor.id if instructor else 'None'} for class {class_instance.id}", "lecture_id": lecture.id}
        else:
            logger.info(f"Lecture updated for course {course.id} assigned to Instructor {instructor.id if instructor else 'None'} for class {class_instance.id}.")
            return {"success": f"Lecture updated for course {course.id} assigned to Instructor {instructor.id if instructor else 'None'} for class {class_instance.id}", "lecture_id": lecture.id}

    def allocate_course_no_instructor():
        Lecture.objects.update_or_create(
                        lec_class_id=class_instance,
                        lec_course_id=course,
                        defaults={'lec_instr_id': None}
                    )
        logger.info(f"No suitable instructor found for course {course.id} in class {class_instance.id}. Lecture created with instructor set to None.")
        
    if (instructor is None) or (not instructor):
        allocate_course_no_instructor()
    else:
        allocate_course_with_instructor()

def _clean_db__tabe(tableRef: models.Model) -> None:
    try:
        if tableRef is not None and issubclass(tableRef, models.Model):
            pass
        else:
            raise TypeError(f"Expected an instance of a Django model, but got {type(tableRef).__name__}.")
        
        tableRef.objects.all().delete()
        
        app_name = tableRef._meta.app_label
        model_name = tableRef.__name__

        # Determine the database engine
        db_engine = connection.vendor

        with connection.cursor() as cursor:
            match db_engine:
                case 'postgresql':
                        sequence_name = f"{app_name}_{model_name}_{tableRef._meta.pk.name}_seq"
                        cursor.execute(f"ALTER SEQUENCE {sequence_name} RESTART WITH 1;")
                case 'sqlite':
                    table_name = f"{app_name}_{model_name}"
                    cursor.execute(f"UPDATE sqlite_sequence SET seq = 0 WHERE name = '{table_name}';")
                # Default case
                case _:
                    pass
        printSucc(f"Model_`{tableRef.__name__}` cleaned Successfully for \"{db_engine}\".")
        
        connection.close()
        del app_name, model_name, db_engine

    except TypeError:
        raise
    except Exception as e:
        raise NotImplementedError(f"Model: {tableRef.__name__} can't be cleaned.\n ``Unexpected error: {e}")


def automatic_course_allocation():
    try:
        _clean_db__tabe(tableRef=Lecture)
        
        classes: models.QuerySet[Class] = Class.objects.all()
        courses: models.QuerySet[Course] = Course.objects.all()
        instructors: models.QuerySet[Instructor] = Instructor.objects.all()

        global a_flag

        for instructor in instructors:
            instructor.taken_credit_hours = 0
            instructor.save()
            for course in courses:
                course_offering_in_semesters_ids = [semester_id for semester_id in course.crs_for_semesters_id.values_list('id', flat=True)]
                for class_instance in classes:
                    if class_instance.class_semester_id.id in course_offering_in_semesters_ids:
                        
                        similar_lecture_already_assigned: Lecture = Lecture.objects.filter(lec_class_id__id=class_instance.id, lec_course_id__id=course.id).first()
                        assigned_instructor: Instructor = similar_lecture_already_assigned.lec_instr_id if similar_lecture_already_assigned else None
                        
                        # verify hard constraints
                        available_instructor_tentative: Instructor = instructor if check_hard_constraints( 
                                                                        instructor, 
                                                                        course, 
                                                                        class_instance
                                                                    ) else None
                        
                        # verify soft constraints
                        available_instructor: Instructor = None
                        if available_instructor_tentative:
                            available_instructor = available_instructor_tentative if check_soft_constraints( 
                                                                available_instructor_tentative,
                                                                course, 
                                                                class_instance, 
                                                                assigned_instructor
                                                            ) else None
                        
                        if a_flag:
                            # print("--cstm--", class_instance, course, available_instructor, course_offering_in_semesters_ids, (class_instance.class_semester_id.id in course_offering_in_semesters_ids))
                            pass
                        
                        # if 'available_instructor' is None, value of 'available_instructor_tentative' will be assigned to 'instr'
                        instr = available_instructor or available_instructor_tentative
                        if instr:
                            allocate_course(course, class_instance, instr, assigned_instructor)
                        elif assigned_instructor:
                            pass
                        else:
                            allocate_course(course, class_instance)
        a_flag = False
    except KeyError as e:
        printErr(e)
        return {
            "data": {
                "error": "Automatic course allocation failed", 
                "message": str(e)
            },
            "status_code": status.HTTP_404_NOT_FOUND,
        }
    except ValueError as e:
        printErr(e)
        return {
            "data": {
                "error": "Automatic course allocation failed", 
                "message": str(e)
            },
            "status_code": status.HTTP_400_BAD_REQUEST,
        }
    except NotImplementedError as e:
        printErr(e)
        return {
            "data": {
                "error": "Automatic course allocation failed", 
                "message": str(e)
            },
            "status_code": status.HTTP_501_NOT_IMPLEMENTED,
        }
    except Exception as e:
        printErr(e)
        return {
            "data": {
                "error": "Automatic course allocation failed", 
                "message": str(e)
            },
            "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
        }
    else:
        msg = "Automatic course allocation completed"
        printSucc(msg)
        return {
            "data": {
                "success": msg,
            },
            "status_code": status.HTTP_201_CREATED,
        }

def printErr(errRef: Exception):
    print(f"\033[31mError: {str(errRef)}\033[0m")

def printSucc(msg: any):
    print(f"\033[32mSuccess: {str(msg)}\033[0m")

