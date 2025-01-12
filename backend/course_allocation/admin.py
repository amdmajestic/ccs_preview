from django.contrib import admin
from .models import Authority, Instructor, Semester, Section, Course, Class, Lecture

admin.site.register(Authority)
admin.site.register(Instructor)
admin.site.register(Semester)
admin.site.register(Section)
admin.site.register(Course)
admin.site.register(Class)
admin.site.register(Lecture)