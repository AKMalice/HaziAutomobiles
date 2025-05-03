import jwt
from functools import wraps
from django.http import JsonResponse
from django.conf import settings

def login_required_with_roles(allowed_roles):
    """
    A decorator to check if the user is authenticated and has the required role(s).
    :param allowed_roles: List of allowed roles (e.g., ['admin', 'customer'])
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapped_view(request, *args, **kwargs):
            # Get the JWT token from the headers
            auth_header = request.headers.get('Authorization', None)
            if not auth_header:
                return JsonResponse({'error': 'Token missing'}, status=401)
            
            try:
                # Extract token from "Bearer <token>"
                token = auth_header.split(' ')[1]
                
                # Decode the JWT token
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                role = payload.get('role')

                if not role or role not in allowed_roles:
                    return JsonResponse({'error': 'Forbidden: Insufficient role'}, status=403)

                # Attach user info to the request for downstream usage
                request.user_id = payload.get('id')
                request.user_role = role

                # Continue with the original view
                return view_func(request, *args, **kwargs)
            except IndexError:
                return JsonResponse({'error': 'Invalid token format'}, status=401)
            except jwt.ExpiredSignatureError:
                return JsonResponse({'error': 'Token expired'}, status=401)
            except jwt.InvalidTokenError:
                return JsonResponse({'error': 'Invalid token'}, status=401)

        return wrapped_view
    return decorator
