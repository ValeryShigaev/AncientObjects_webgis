import django_filters
from django_filters.fields import CSVWidget

from .models import Mems


class ObjectsFilter(django_filters.FilterSet):
    """ Objects filterset """

    name = django_filters.CharFilter(lookup_expr='icontains')
    fid = django_filters.NumberFilter()
    region = django_filters.BaseInFilter(widget=CSVWidget)
    district = django_filters.BaseInFilter(widget=CSVWidget)
    type = django_filters.BaseInFilter(widget=CSVWidget)
    status = django_filters.BaseInFilter(widget=CSVWidget)
    pos = django_filters.BaseInFilter(widget=CSVWidget)

    class Meta:
        model = Mems
        fields = ("fid", "name", "district", "region", "type", "av_order",
                  "status", "pos")