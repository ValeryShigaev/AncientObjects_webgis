#!/bin/bash

cd webgis/

python manage.py makemigrations
python manage.py migrate
python manage.py loaddata fixtures/mems_dump.json
#python manage.py loaddata fixtures/images.json
#python manage.py initadmin
#python manage.py test
##python manage.py bot &
#
##celery -A app worker -l INFO &
gunicorn --bind 0.0.0.0:8000 webgis.wsgi:application
#python3 manage.py runserver