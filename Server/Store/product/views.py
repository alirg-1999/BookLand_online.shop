from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets, response, permissions, filters, status


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_delete=False)
    serializer_class = CategorySerializer


class AuthorBookViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuthorBook.objects.filter(is_delete=False)
    serializer_class = AuthorBookSeralizer


class TranslatorBookViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TranslatorBook.objects.filter(is_delete=False)
    serializer_class = TranslatorBookSeralizer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_delete=False).order_by('-create_at')
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['book_title', "audience_age"]
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = super().get_queryset()
        filter_category = self.request.query_params.get('category', None)

        if filter_category:
            queryset = self.queryset.filter(
                is_delete=False, book_category=filter_category).order_by('-create_at')

        return queryset


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = ReviewProduct.objects.filter(is_delete=False)
    serializer_class = ReviewSeralizer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def create(self, request):
        book = request.data.get('book', None)
        rating_value = request.data.get('rating_value', None)
        comment_title = request.data.get('comment_title', None)
        comment_content = request.data.get('comment_content', None)

        try:
            product = Product.objects.get(pk=book)
            if ReviewProduct.objects.filter(user=request.user, book=product).exists():
                return response.Response({'error': 'You have already commented on this item.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user_review = ReviewProduct.objects.create(
                    user=request.user, book=product, rating_value=rating_value,  comment_title=comment_title, comment_content=comment_content)
                serializer = ReviewSeralizer(user_review)
                return response.Response(serializer.data, status=status.HTTP_201_CREATED)

        except Product.DoesNotExist:
            return response.Response({'error': 'this book not found'}, status=status.HTTP_404_NOT_FOUND)

    def get_queryset(self):
        queryset = super().get_queryset()
        review = self.request.query_params.get('review', None)

        if review:
            queryset = self.queryset.filter(
                is_delete=False, book=review).order_by('-create_at')

        return queryset
