from django.contrib.gis.db import models


class Mems(models.Model):
    fid = models.AutoField(db_column='FID', primary_key=True,
                           help_text='int: feature id')
    geom = models.GeometryField(blank=True, null=True)
    region = models.IntegerField(blank=True, null=True,
                                 help_text='int: region of memorial')
    district = models.CharField(max_length=254, blank=True, null=True,
                                help_text='str: district of memorial')
    name = models.CharField(max_length=254, blank=True, null=True,
                            help_text='str: name of memorial')
    type = models.CharField(max_length=254, blank=True, null=True,
                            help_text='str: type of memorial')
    av_order = models.CharField(max_length=254, blank=True, null=True,
                                help_text='str: average order')
    status = models.CharField(max_length=254, blank=True, null=True,
                              help_text='str: status of memorial')
    pos = models.IntegerField(blank=True, null=True,
                              help_text='nt: accuracy of memorial position')
    notes = models.TextField(blank=True, null=True,
                             help_text='str: short description')
