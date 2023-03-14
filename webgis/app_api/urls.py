from django.urls import path
from rest_framework.documentation import include_docs_urls
from .views import ObjectsList

urlpatterns = [
    path('', include_docs_urls(title="Spatial data API"), name='main'),
    path('objects/', ObjectsList.as_view(), name='objects_list'),
    ]
