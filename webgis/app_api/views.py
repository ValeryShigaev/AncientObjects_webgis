from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ObjectsListSerializer
from .filters import ObjectsFilter
from .models import Mems


class ObjectsList(generics.ListAPIView):
    serializer_class = ObjectsListSerializer
    filter_backends = [DjangoFilterBackend, ]
    filterset_class = ObjectsFilter
    queryset = Mems.objects.all()

