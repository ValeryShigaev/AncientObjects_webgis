import django_filters
from django_filters.fields import CSVWidget

from .models import Mems

mult_text = "Multiple values may be separated by commas"


class ObjectsFilter(django_filters.FilterSet):
    """ Objects filterset """

    name = django_filters.CharFilter(lookup_expr='icontains',
                                     help_text='str: name of memorial. '
                                               'Search field')
    fid = django_filters.NumberFilter(help_text='int: feature id')
    region = django_filters.BaseInFilter(widget=CSVWidget,
                                         help_text=f'int: region of memorial. '
                                                   f'{mult_text}')
    district = django_filters.BaseInFilter(widget=CSVWidget,
                                           help_text=f'str: district of '
                                                     f'memorial. {mult_text}')
    type = django_filters.BaseInFilter(widget=CSVWidget,
                                       help_text=f'str: type of '
                                                 f'memorial. {mult_text}')
    status = django_filters.BaseInFilter(widget=CSVWidget,
                                         help_text=f'str: status of '
                                                   f'memorial. {mult_text}')
    pos = django_filters.BaseInFilter(widget=CSVWidget,
                                      help_text=f'int: accuracy of '
                                                f'memorial position. '
                                                f'{mult_text}')
    av_order = django_filters.CharFilter(help_text='str: average order')

    class Meta:
        model = Mems
        fields = ("fid", "name", "district", "region", "type", "av_order",
                  "status", "pos")
