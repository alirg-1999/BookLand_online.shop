from django.shortcuts import render
from rest_framework import viewsets, permissions, response, status
from rest_framework.decorators import action
from .models import *
from .serializers import *
from product.models import *
from user.models import *


class CouponViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Coupon.objects.filter(is_delete=False)
    serializer_class = CouponSerializer
    lookup_field = 'code'


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'order_id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def create(self, request):
        product_pk = request.data.get('product', None)
        orderid = request.data.get('order_id', None)
        coupon = request.data.get('coupon', None)

        try:
            product = Product.objects.get(pk=product_pk)
        except Product.DoesNotExist:
            return response.Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        user_order = Order.objects.create(
            user_item=request.user, product=product, order_id=orderid, status="PENDING",  coupon=coupon)

        serializer = OrderSerializer(user_order)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id_paid = self.request.query_params.get('user_id_paid', None)
        user_id_pending = self.request.query_params.get(
            'user_id_pending', None)

        if user_id_paid:
            queryset = self.queryset.filter(
                is_delete=False, user_item=user_id_paid, status="PAID").order_by('create_at')
        if user_id_pending:
            queryset = self.queryset.filter(
                is_delete=False, user_item=user_id_pending, status="PENDING").order_by('create_at')

        return queryset
