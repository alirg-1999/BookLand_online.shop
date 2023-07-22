from django.db import models
from core.models import BaseModel, CustomUser
from django.contrib.auth.models import AbstractUser

class CustomerUser(CustomUser, AbstractUser , BaseModel):
    object = CustomUser
    email = models.EmailField(unique=True , null=True , blank=True)
    username='none'
    class Meta:
        ordering = ['-create_at']
        verbose_name = 'User'
