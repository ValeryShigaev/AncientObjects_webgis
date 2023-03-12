from django.contrib.gis.db import models


class Mems(models.Model):
    fid = models.AutoField(db_column='FID', primary_key=True)
    geom = models.GeometryField(blank=True, null=True)
    region = models.IntegerField(blank=True, null=True,
                                 help_text='int: region')
    district = models.CharField(max_length=254, blank=True, null=True,
                                help_text='str: district')
    name = models.CharField(max_length=254, blank=True, null=True,
                            help_text='str: district')
    type = models.CharField(max_length=254, blank=True, null=True,
                            help_text='str: type')
    av_order = models.CharField(max_length=254, blank=True, null=True,
                                help_text='str: average order')
    status = models.CharField(max_length=254, blank=True, null=True,
                              help_text='str: status')
    pos = models.IntegerField(blank=True, null=True,
                              help_text='int: position')
    notes = models.TextField(blank=True, null=True,
                             help_text='str: short description')
