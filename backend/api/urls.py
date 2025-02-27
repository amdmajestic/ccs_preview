from django.urls import path
from django.shortcuts import redirect
from .views import InstructorRegisterView, InstructorLoginView, InstructorProfileView 
from .views import FeedFactoryData, DbDataHandle
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", lambda request: redirect("instructor_login")),

    path('instructors/register/', InstructorRegisterView.as_view(), name='instructor_register'),
    path('instructors/login/', InstructorLoginView.as_view(), name='instructor_login'),
    path('instructors/profile/<int:pk>/', InstructorProfileView.as_view(), name='instructor_profile'),

    path('feed/factory/', FeedFactoryData.as_view(), name='feed_factory'),
    path('db/old/', DbDataHandle.as_view(), name='old_data_handle'),
    # path('db/old/', DbDataHandle.as_view(), {'nocontent': True}, 'old_data_handle'),
]

"""Including Media URLs"""
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)