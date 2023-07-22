import random
from django.db import models
from core.models import BaseModel
from product.models import Product
from user.models import CustomerUser
from django.core.validators import MaxValueValidator, MinValueValidator


def generate_order_id() -> str:
    return str(random.randint(10000000, 99999999))


# Coupon Inheritance core -> basemodels
class Coupon(BaseModel):
    code = models.CharField(max_length=50, unique=True)
    discount = models.IntegerField()
    valid_from = models.DateField()
    valid_to = models.DateField()

    def __str__(self):
        return self.code


class Order(BaseModel):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('PAID', 'Paid'),
        ('CANCELLED', 'Cancelled'),
    )
    order_id = models.CharField(
        max_length=8, unique=True, default=generate_order_id)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='product_order')
    user_item = models.ForeignKey(
        CustomerUser, on_delete=models.CASCADE, related_name='user_order_item')
    total_price = models.PositiveIntegerField(
        default=0, help_text='Final price after using coupon code')
    coupon = models.ForeignKey(
        Coupon, blank=True, null=True, on_delete=models.SET_NULL)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='PENDING')

    class Meta:
        verbose_name = 'Order'

    def __str__(self):
        return f"{self.order_id} - {self.user_item.phone_number} - status {self.status}"

    def save(self, *args, **kwargs):
        if self.coupon:
            discount_amount = (self.coupon.discount / 100) * self.product.price
            discounted_price = self.total_price - discount_amount
            self.total_price = discounted_price
        else:
            self.total_price = self.product.price
        super().save(*args, **kwargs)

