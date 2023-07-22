from django.contrib import admin
from .models import *


@admin.register(Order)
class OrderItemAdmin(admin.ModelAdmin):
    search_fields = ['order_id', 'status']
    exclude = ('totla_price', )


@admin.register(Coupon)
class CuoponAdmin(admin.ModelAdmin):
    search_fields = ['create_at']
