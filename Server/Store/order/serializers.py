from rest_framework import serializers
from .models import *
from product.serializers import *


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        exclude = ('is_delete', 'update_at', 'valid_from',
                   'discount', 'create_at', 'valid_to')


class OrderSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Order
        exclude = ('is_delete', 'update_at', 'create_at')
