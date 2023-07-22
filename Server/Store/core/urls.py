from django.urls import path, include
from user.views import *
from product.views import *
from order.views import *
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token


router = DefaultRouter()

# user urls
router.register('user', UserViewSet, basename='user')
# product urls
router.register('product-category', CategoryViewSet, basename='category')
router.register('products', ProductViewSet, basename='product')
router.register('author-book', AuthorBookViewSet, basename='author')
# comment url
router.register('review', ReviewViewSet, basename='review')
# order url
router.register('order', OrderViewSet, basename='order')

router.register('coupon', CouponViewSet, basename='coupon')
urlpatterns = [
    path('api/', include(router.urls)),
    path('user-auth/', PhoneObtainAuthToken.as_view(), name='api_token_auth'),
    path('change-password/',
         ChangePasswordViewSet.as_view({'patch': 'update'}), name='change-password'),

]
