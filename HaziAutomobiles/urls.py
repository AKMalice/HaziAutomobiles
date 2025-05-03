from django.contrib import admin
from django.urls import path,re_path
from django.conf import settings
from django.conf.urls.static import static
from dashboard.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Authentication endpoints
    path('api/register/', register_view, name='register'),
    path('api/login/', login_view, name='login'),
    
    # Protected endpoints
    path('api/admin/dashboard/', admin_dashboard, name='admin_dashboard'),

    # Regular Expression that matches all url paths, keep at the end
    re_path(r'^.*$', home, name='home')
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
