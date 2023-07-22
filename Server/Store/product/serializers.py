from rest_framework import serializers
from .models import *
from user.serializers import *


class CategorySerializer (serializers.ModelSerializer):
    class Meta:
        model = Category
        exclude = ('is_delete' , 'update_at' , 'create_at')

class AuthorBookSeralizer(serializers.ModelSerializer):
    class Meta:
        model = AuthorBook
        exclude = ('is_delete' , 'update_at' , 'create_at')


class TranslatorBookSeralizer(serializers.ModelSerializer):
    class Meta:
        model = TranslatorBook
        exclude = ('is_delete' , 'update_at')


class ProductSerializer(serializers.ModelSerializer):
    book_category = CategorySerializer(read_only =True)
    book_author = AuthorBookSeralizer(read_only =True)
    translator = TranslatorBookSeralizer(read_only =True)

    
    class Meta:
        model = Product
        exclude = ('is_delete' , 'update_at')


class ReviewSeralizer(serializers.ModelSerializer):
    user = UserSerializers()

    class Meta:
        model = ReviewProduct
        exclude = ('is_delete' , 'update_at')

