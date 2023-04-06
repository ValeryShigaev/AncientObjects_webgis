from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import (ObjectsListSerializer, ObjectsCreateSerializer,
                          ObjectsUpdateSerializer, ObjectsMoveSerializer,
                          ObjectsDeleteSerializer)
from .filters import ObjectsFilter
from .models import Mems
from .services import geometry_from_xy


class ObjectsList(generics.ListAPIView):
    """ Returns geojson serialized list of memorials """

    serializer_class = ObjectsListSerializer
    filter_backends = [DjangoFilterBackend, ]
    filterset_class = ObjectsFilter
    queryset = Mems.objects.all()
    search_fields = ["name"]


class ObjectsCreate(generics.CreateAPIView):
    """ Uses for creating memorials """

    serializer_class = ObjectsCreateSerializer

    def perform_create(self, serializer):
        data = serializer.validated_data
        x, y = data.get('x'), data.get('y')
        serializer.validated_data.pop('x', None)
        serializer.validated_data.pop('y', None)
        serializer.save(geom=geometry_from_xy(x, y))


class ObjectsUpdate(generics.UpdateAPIView):
    """ Updates attributes of memorial """

    serializer_class = ObjectsUpdateSerializer
    queryset = Mems.objects.all()


class ObjectsMove(generics.UpdateAPIView):
    """ Changes objects geometry """

    serializer_class = ObjectsMoveSerializer
    queryset = Mems.objects.all()


class ObjectsDelete(generics.DestroyAPIView):
    """ Deleting an object """

    serializer_class = ObjectsDeleteSerializer
    queryset = Mems.objects.all()

