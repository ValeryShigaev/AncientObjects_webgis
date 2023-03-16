from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('app_api.urls')),
    path('', include('app_map.urls')),
]
urlpatterns += staticfiles_urlpatterns()
