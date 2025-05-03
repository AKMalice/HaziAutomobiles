from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password
from .models import CustomUser
import json
from datetime import datetime, timedelta
import jwt
from django.conf import settings
from .auth import login_required_with_roles

def home(request):
    return render(request,'index.html')

def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            phone_number = data.get('phone_number')
            name = data.get('name')
            password = data.get('password')
            address = data.get('address')
            pin_code = data.get('pin_code')
            
            # Basic validation
            if not all([email, phone_number, name, password]):
                return JsonResponse({'error': 'Required fields missing'}, status=400)
                
            # Check if user already exists
            if CustomUser.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already registered'}, status=400)
                
            if CustomUser.objects.filter(phone_number=phone_number).exists():
                return JsonResponse({'error': 'Phone number already registered'}, status=400)
            
            # Create new user (role defaults to 'customer')
            user = CustomUser.objects.create(
                email=email,
                phone_number=phone_number,
                name=name,
                password=password,  # Will be hashed in the save method
                address=address,
                pin_code=pin_code
            )
            
            return JsonResponse({'message': 'Registration successful'}, status=201)
            
        except Exception as e:
            return JsonResponse({'error': f'Registration failed: {str(e)}'}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return JsonResponse({'error': 'Email and password are required'}, status=400)

            try:
                user = CustomUser.objects.get(email=email)

                if check_password(password, user.password):
                    token = jwt.encode(
                        {
                            'id': user.id,
                            'role': user.role,
                            'exp': datetime.utcnow() + timedelta(hours=6)
                        },
                        settings.SECRET_KEY,
                        algorithm='HS256'
                    )
                    return JsonResponse({'token': token, 'role': user.role})
                else:
                    return JsonResponse({'error': 'Invalid credentials'}, status=400)

            except CustomUser.DoesNotExist:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)

        except Exception as e:
            return JsonResponse({'error': f'Login failed: {str(e)}'}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Example protected views
@login_required_with_roles(['admin'])
def admin_dashboard(request):
    """Example view that only admins can access"""
    return JsonResponse({
        'message': 'Welcome to admin dashboard',
        'user_id': request.user_id
    })

