from django.contrib import admin
from .models import *


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    search_fields = ['category_title']

@admin.register(AuthorBook)
class AuthorBookAdmin(admin.ModelAdmin):
    search_fields = ['author_name']


@admin.register(TranslatorBook)
class TranslatorBookAdmin(admin.ModelAdmin):
    search_fields = ['translator_name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_filter = ['book_title']
    search_fields = ['book_title']
    prepopulated_fields = {'slug': ['book_title']}

    fieldsets = [[None, {"fields":
                         ['book_title', 'book_category', 'language', 'audience_age', 'book_publisher', 'book_author',  'translator', 'pages', 'description', 'book_img',  'price']}],
                 ["Product option", {"classes": ["collapse"], "fields": [
                     'slug', 'is_delete' , 'average_rating']}],
                 ["Discount", {"classes": ["collapse"], "fields": [ 'discount_book']}]]


@admin.register(ReviewProduct)
class ReviewAdmin(admin.ModelAdmin):
    search_fields = ['user']

