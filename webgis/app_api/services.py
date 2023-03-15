from django.contrib.gis.geos import GEOSGeometry, MultiPoint, Point


def geometry_from_xy(x: float, y: float) -> MultiPoint:
    """
    This function allows to convert x, y decimal coordinates to Geos geometry

    Parameters:
    :param x: WGS-84 N coordinate
    :type x: float
    :param y: WGS-84 E coordinate
    :type y: float
    :rtype: MultiPoint
    """

    return MultiPoint(Point(y, x))

