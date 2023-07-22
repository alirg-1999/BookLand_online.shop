from django.contrib import admin
from .models import CustomerUser
# admin Profile user
@admin.register(CustomerUser)
class UserAdmin(admin.ModelAdmin):

    fieldsets = [[None, {"fields": ['first_name' , 'last_name', 'email' , 'phone_number', 'password']}],
                 ["Advanced options", {"classes": ["collapse"], "fields": ['is_admin' , 'is_delete' , 'groups' , 'user_permissions' ,'last_login' ]}],]
    list_per_page = 10

    search_fields = ['phone_number', 'email']
