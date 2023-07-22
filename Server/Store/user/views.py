from django.contrib.auth import get_user_model
from .serializers import *
from rest_framework import viewsets, permissions, response, status
from rest_framework.authtoken import views
from rest_framework.decorators import action


User = get_user_model()


class CustomPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return permissions.IsAuthenticated().has_permission(request, view)
        elif request.method == 'POST':
            return permissions.AllowAny().has_permission(request, view)
        elif request.method == 'PATCH':
            return permissions.IsAuthenticated().has_permission(request, view)
        return False


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_delete=False)
    serializer_class = UserSerializers
    lookup_field = "phone_number"
    permission_classes = [CustomPermission]


class PhoneObtainAuthToken(views.ObtainAuthToken):
    serializer_class = LoginAuthSerializers


class ChangePasswordViewSet(viewsets.ViewSet):
    def update(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = self.request.user
        old_password = serializer.validated_data['old_password']
        new_password = serializer.validated_data['new_password']
        confirm_password = serializer.validated_data['confirm_password']

        if new_password != confirm_password:
            return response.Response({"error": "New password and Confirm password must match."},
                                     status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(old_password):
            return response.Response({"error": "Old password is incorrect."},
                                     status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return response.Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)
