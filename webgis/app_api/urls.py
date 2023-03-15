from django.urls import path
from rest_framework.documentation import include_docs_urls
from .views import (ObjectsList, ObjectsCreate, ObjectsUpdate, ObjectsMove,
                    ObjectsDelete)

urlpatterns = [
    path('', include_docs_urls(title="Spatial data API"), name='main'),
    path('objects/', ObjectsList.as_view(), name='list'),
    path('objects/create', ObjectsCreate.as_view(), name='create'),
    path('objects/update/<int:fid>', ObjectsUpdate.as_view(lookup_field="fid"),
         name='update'),
    path('objects/move/<int:fid>', ObjectsMove.as_view(lookup_field="fid"),
         name='move'),
    path('objects/delete/<int:fid>', ObjectsDelete.as_view(lookup_field="fid"),
         name='delete'),
    ]
