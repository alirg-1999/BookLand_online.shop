from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# ****
class BaseManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_delete=False)

    def get_all(self):
        return super().get_queryset()


# base models
class BaseModel(models.Model):
    objects = BaseManager()
    is_delete = models.BooleanField(default=False)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        self.is_delete = True
        self.save()

    def undelete(self):
        self.is_delete = False
        self.save()


# custom base for user Super user
class CustomUserManager(BaseUserManager):   
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError('The Phone Number field must be set')
        
        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(phone_number, password, **extra_fields)


class CustomUser(AbstractBaseUser):
    phone_number = models.CharField(max_length=12, unique=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'phone_number'

    def __str__(self):
        return self.phone_number
    

