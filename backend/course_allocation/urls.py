from django.shortcuts import redirect
from django.urls import path
from .views import get_instructors, get_courses, get_classes, get_lectures, allocate, allocate_all_courses, instructor_profile_update

urlpatterns = [
    path("", lambda request: redirect('allocate')),

    path('instructors/', get_instructors, name='get_instructors'),
    path('courses/', get_courses, name='get_courses'),
    path('classes/', get_classes, name='get_classes'),
    path('lectures/', get_lectures, name='get_lectures'),
    path('allocate/', allocate, name='allocate'),
    path('allocate_all_courses/', allocate_all_courses, name='allocate_all_courses'),

    path('instructor/profile/<int:instructor_id>/', instructor_profile_update, name='update_instructor_profile'),
]