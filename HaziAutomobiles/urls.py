from django.contrib import admin
from django.urls import path,re_path
from dashboard.views import *

urlpatterns = [
    path('admin/', admin.site.urls),

    # Regular Expression that matches all url paths, keep at the end
    re_path(r'^.*$', home, name='home')
]
