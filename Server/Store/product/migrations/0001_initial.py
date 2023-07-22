# Generated by Django 4.2 on 2023-07-17 14:15

import ckeditor.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AuthorBook',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_delete', models.BooleanField(default=False)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('author_name', models.CharField(max_length=100)),
                ('author_img', models.FileField(blank=True, null=True, upload_to='Author/')),
                ('author_discription', ckeditor.fields.RichTextField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_delete', models.BooleanField(default=False)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('category_title', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_delete', models.BooleanField(default=False)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('book_title', models.CharField(max_length=255)),
                ('slug', models.SlugField(help_text='this is full automatic with product title')),
                ('book_publisher', models.CharField(blank=True, max_length=100)),
                ('pages', models.PositiveIntegerField()),
                ('description', ckeditor.fields.RichTextField()),
                ('audience_age', models.CharField(choices=[('All', 'all'), ('Children', 'children'), ('Teenager', 'teenager'), ('Adult', 'adult')], default='All', help_text='This book is suitable for?', max_length=40)),
                ('product_count', models.PositiveIntegerField(default=1, help_text='Product stock in stock')),
                ('price', models.PositiveIntegerField(default=0)),
                ('book_img', models.FileField(upload_to='Product/')),
                ('discount_book', models.IntegerField(blank=True, default=0, null=True)),
                ('language', models.CharField(blank=True, max_length=100, null=True)),
                ('average_rating', models.PositiveIntegerField(default=0, help_text='this full automatic with user set rating')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TranslatorBook',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_delete', models.BooleanField(default=False)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('translator_name', models.CharField(max_length=100)),
                ('trnaslator_img', models.FileField(blank=True, null=True, upload_to='Translator/')),
                ('translator_discription', ckeditor.fields.RichTextField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ReviewProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_delete', models.BooleanField(default=False)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('rating_value', models.PositiveSmallIntegerField(choices=[(0, '0'), (1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')], default=0)),
                ('comment_title', models.CharField(max_length=100)),
                ('comment_content', models.TextField()),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='review_book', to='product.product')),
            ],
            options={
                'verbose_name': 'Review',
            },
        ),
    ]