#!/bin/bash

cd webgis/

python manage.py makemigrations
python manage.py migrate
python manage.py loaddata fixtures/mems_dump.json
python manage.py collectstatic --noinput
gunicorn --bind 0.0.0.0:8000 webgis.wsgi:application
