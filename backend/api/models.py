from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

class GenericUser(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_CHOICES = (
        ('ins', 'Instructor'),
        ('stu', 'Student'),
    )

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    user_type = models.CharField(max_length=50, choices=USER_TYPE_CHOICES, default='ins')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email



class Authority(models.Model):
    authority = models.CharField(max_length=25, unique=True, null=True, verbose_name="Authority Name")

    def __str__(self):
        return self.authority

class Instructor(models.Model):
    user = models.OneToOneField(GenericUser, on_delete=models.CASCADE, related_name='instructor')
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.CharField(max_length=25, null=True, blank=True)
    degree = models.CharField(max_length=50, choices=[('Bachelors', 'Bachelors'), ('Masters', 'Masters'), ('PhD', 'PhD')], null=True, blank=True)
    expertise = models.JSONField(default=list, blank=True)
    teaching_experience = models.IntegerField(null=True, blank=True)
    is_visiting = models.BooleanField(default=False)
    time_slots = models.CharField(max_length=255, null=True, blank=True)
    course_preferences = models.JSONField(default=list, blank=True)
    authority = models.OneToOneField(Authority, default=None, null=True, on_delete=models.SET_NULL, related_name='instructor', unique=True)
    taken_credit_hours = models.IntegerField(default=0, verbose_name="Taken Credit Hours")
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')], null=True, blank=True)

    # Optional: This method can be used to delete the related user instance when the instructor is deleted.
    def delete(self, *args, **kwargs):
        # If you want to delete the associated user when the instructor is deleted, use:
        self.user.delete()
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.user.email