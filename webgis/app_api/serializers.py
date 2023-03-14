from rest_framework_gis import serializers as serializers_geo
from django.contrib.gis.geos import GEOSGeometry, Point
from .models import Mems


class ObjectsListSerializer(serializers_geo.GeoFeatureModelSerializer):
    """ Serialized objects features to geojson """

    other_point = serializers_geo.GeometrySerializerMethodField()

    def get_other_point(self, obj):
        return Point(GEOSGeometry(obj.geom).coords[0])

    class Meta:
        model = Mems
        fields = ('fid', 'name', 'region', 'district', 'type', 'av_order',
                  'status', 'pos', 'notes')
        geo_field = 'other_point'