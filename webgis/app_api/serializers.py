from rest_framework import serializers
from rest_framework_gis import serializers as serializers_geo
from django.contrib.gis.geos import GEOSGeometry, Point
from .models import Mems
from .services import geometry_from_xy


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


class ObjectsCreateSerializer(serializers.ModelSerializer):
    """ Creating objects serializer"""

    x = serializers.FloatField(required=True, write_only=True,
                               help_text="float: WGS-84 N coordinate")
    y = serializers.FloatField(required=True, write_only=True,
                               help_text="float: WGS-84 E coordinate")

    class Meta:
        model = Mems
        fields = ('name', 'region', 'district', 'type', 'av_order', 'status',
                  'pos', 'notes', 'x', 'y')


class ObjectsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mems
        fields = ('fid', 'name', 'region', 'district', 'type', 'av_order',
                  'status', 'pos', 'notes')


class ObjectsMoveSerializer(serializers.ModelSerializer):
    """ Updates objects geometry """

    x = serializers.FloatField(required=True, write_only=True,
                               help_text="float: WGS-84 N coordinate")
    y = serializers.FloatField(required=True, write_only=True,
                               help_text="float: WGS-84 E coordinate")

    def update(self, instance, validated_data):
        """ Here client coordinates are converted to geometry and written """

        x, y = validated_data.get('x'), validated_data.get('y')
        validated_data["geom"] = geometry_from_xy(x, y)
        validated_data.pop('x', None)
        validated_data.pop('y', None)
        obj = Mems.objects.get(fid=instance.fid)
        Mems.objects.filter(fid=instance.fid).update(**validated_data)
        return obj

    class Meta:
        model = Mems
        fields = ('fid', 'x', 'y')


class ObjectsDeleteSerializer(serializers.ModelSerializer):
    """ Deleting objects """

    class Meta:
        model = Mems
        fields = ('fid', )


