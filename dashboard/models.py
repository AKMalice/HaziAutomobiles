from django.db import models
from django.contrib.auth.hashers import make_password, check_password, identify_hasher

# Create your models here.

class CustomUser(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('customer', 'Customer'),
    ]
    
    email = models.EmailField(unique=True, max_length=255)
    phone_number = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=150)
    address = models.TextField(blank=True, null=True)
    pin_code = models.CharField(max_length=10, blank=True, null=True)
    profile_photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True, default='profile_photos/default-avatar.jpg')
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='customer')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Check if the password is already hashed
        try:
            identify_hasher(self.password)
        except ValueError:
            # If not hashed, hash the password
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
