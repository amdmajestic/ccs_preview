from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Instructor

GenericUserModel = get_user_model()

class GenericUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenericUserModel
        fields = '__all__'

class GenericUserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenericUserModel
        fields = ('email', 'name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return GenericUserModel.objects.create_user(**validated_data)

class GenericUserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenericUserModel
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class InstructorCreateSerializer(serializers.ModelSerializer):
    user = GenericUserRegisterSerializer()

    class Meta:
        model = Instructor
        fields = ('user',)  # Include only the necessary fields for creation
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # Handle creation of the user first
        user_data = validated_data.pop('user')
        user_data['user_type'] = 'ins'  # Set user_type to 'ins' for Instructor
        user = GenericUserModel.objects.create_user(**user_data)
        
        # Now create the Instructor instance and associate the user
        return Instructor.objects.create(user=user, **validated_data)

class InstructorUpdateSerializer(serializers.ModelSerializer):
    user = GenericUserRegisterSerializer()

    class Meta:
        model = Instructor
        fields = '__all__'  # Use '__all__' or customize the list of fields as per your need

    def update(self, instance, validated_data):
        # Handle user data separately from instructor data
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            user.email = user_data.get('email', user.email)
            user.name = user_data.get('name', user.name)
            if 'password' in user_data:
                user.set_password(user_data['password'])
            user.save()

        # Update other instructor fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance