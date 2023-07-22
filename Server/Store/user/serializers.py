from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model, authenticate
from .models import *

User = get_user_model()

# serialize User


class UserSerializers(serializers.ModelSerializer, serializers.Serializer):
    class Meta:
        model = CustomerUser
        fields = ['id', 'first_name', 'last_name',
                  'email', 'phone_number', 'password']

        read_only_fields = ['is_staff']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomerUser(**validated_data)
        user.set_password(password)
        user.save()
        Token.objects.create(user=user)
        return user


class LoginAuthSerializers(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        phone_number = data.get('phone_number')
        password = data.get('password')

        if phone_number and password:
            user = authenticate(phone_number=phone_number, password=password)

            if user:
                data['user'] = user
                return data
            else:
                raise serializers.ValidationError(
                    'Invalid phone number or password.')
        else:
            raise serializers.ValidationError(
                'Phone number and password are required.')


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)
