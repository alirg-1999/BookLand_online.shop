from django.db import models
from django.dispatch import receiver
# import models from other app
from core.models import BaseModel
from user.models import CustomerUser
from ckeditor.fields import RichTextField
import os


# category Inheritance core -> basemodels
class Category(BaseModel):
    category_title = models.CharField(
        max_length=50, null=True, blank=True)
    category_parent = models.ForeignKey(
        'self', on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.category_title}"


# BookAuthor Inheritance core -> basemodels
class AuthorBook(BaseModel):
    author_name = models.CharField(max_length=100)
    author_img = models.FileField(upload_to='Author/', null=True, blank=True)
    author_discription = RichTextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.author_name


class TranslatorBook(BaseModel):
    translator_name = models.CharField(max_length=100)
    trnaslator_img = models.FileField(
        upload_to="Translator/", null=True, blank=True)
    translator_discription = RichTextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.translator_name

# Product Inheritance core -> basemodels


class Product(BaseModel):
    ABES_CHOICES = (
        ('All', 'all'),
        ('Children', 'children'),
        ('Teenager', 'teenager'),
        ('Adult', 'adult'),
    )
    book_title = models.CharField(max_length=255, null=False, blank=False)
    slug = models.SlugField(
        help_text='this is full automatic with product title')
    book_category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True)
    book_publisher = models.CharField(max_length=100, null=False, blank=True)
    book_author = models.ForeignKey(AuthorBook, on_delete=models.PROTECT,
                                    related_name='book_author', help_text='required this field', null=False, blank=False)
    translator = models.ForeignKey(
        TranslatorBook, on_delete=models.SET_NULL, blank=True, null=True)
    pages = models.PositiveIntegerField(null=False, blank=False)
    description = RichTextField()
    audience_age = models.CharField(
        max_length=40, choices=ABES_CHOICES, default='All', help_text='This book is suitable for?')
    product_count = models.PositiveIntegerField(
        default=1, help_text='Product stock in stock')
    price = models.PositiveIntegerField(default=0, null=False, blank=False)
    book_img = models.FileField(upload_to='Product/', null=False, blank=False)
    discount_book = models.IntegerField(default=0, null=True, blank=True)
    language = models.CharField(max_length=100, null=True, blank=True)
    average_rating = models.PositiveIntegerField(
        default=0, help_text='this full automatic with user set rating')

    def discount_book_price(self) -> int:
        if self.discount_book > 0:
            return self.price - self.discount_book
        return self.price

    def use_coupon(self) -> int:
        if self.coupon:
            return self.price - self.coupon.discount
        return self.price

    def __str__(self) -> str:
        return self.book_title


# Comment Inheritance core -> basemodels // relate to Product models for and user CustomUser
class ReviewProduct(BaseModel):
    RATING_CHOISE = ((0, '0'), (1, '1'), (2, '2'),
                     (3, '3'), (4, '4'), (5, '5'))

    book = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='review_book')
    user = models.ForeignKey(
        CustomerUser, on_delete=models.CASCADE, related_name='user_set_review')
    rating_value = models.PositiveSmallIntegerField(
        choices=RATING_CHOISE, default=0)
    comment_title = models.CharField(max_length=100)
    comment_content = models.TextField()

    class Meta:
        verbose_name = 'Review'

    def __str__(self) -> str:
        return f'{self.book.book_title} get {self.comment_title} by {self.user.email}'


@receiver(models.signals.post_save, sender=ReviewProduct)
def update_product_average_rating(sender, instance, **kwargs):
    product = instance.book
    average_rating = product.review_book.aggregate(
        avg_rating=models.Avg('rating_value'))['avg_rating']
    product.average_rating = average_rating
    product.save()
