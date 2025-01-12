from django.db import models
from api.models import Authority, Instructor

class Semester(models.Model):
    count = models.CharField(max_length=4, unique=True, verbose_name="Semester Count")
    has_sections = models.IntegerField(default=1)

    @property
    def __details__(self):
        return self.count
    
class Section(models.Model):
    name = models.CharField(max_length=1, unique=True)

    @property
    def __details__(self):
        return self.name

class Course(models.Model):
    code = models.CharField(max_length=10, null=True, unique=True, blank=True)
    name = models.CharField(max_length=250)
    credit_hours = models.IntegerField()
    abbr = models.CharField(max_length=10, null=True, unique=True, blank=True)
    crs_for_semesters_id = models.ManyToManyField(Semester, related_name='course_for_semesters')  # Many-to-many relationship with Semester
    crs_coordinator_id = models.ForeignKey(Instructor, null=True, on_delete=models.SET_NULL, related_name='course_coordinator')

    @property
    def __details__(self):
        return self.name

class Class(models.Model):
    class_semester_id = models.ForeignKey(Semester, null=True, on_delete=models.CASCADE, related_name='class_semester')
    class_section_id = models.ForeignKey(Section, default=1, on_delete=models.CASCADE, related_name='class_section')
    course_advisor_id = models.ForeignKey(Instructor, null=True, on_delete=models.SET_NULL, related_name='class_courseAdvisor')

    class Meta:
        unique_together = ('class_semester_id', 'class_section_id')

    @property
    def __details__(self):
        return f"BSSE - {self.class_semester_id.id}{self.class_section_id.name}"

class Lecture(models.Model):
    lec_class_id = models.ForeignKey(Class, null=True, on_delete=models.CASCADE, related_name='lecture_class')
    lec_course_id = models.ForeignKey(Course, null=True, on_delete=models.CASCADE, related_name='lecture_course')
    lec_instr_id = models.ForeignKey(Instructor, null=True, on_delete=models.SET_NULL, related_name='lecture_instr')

    @property
    def __details__(self):
        return f"Lecture for {self.lec_course_id.name} in {self.lec_class_id} with {self.lec_instr_id.name}"