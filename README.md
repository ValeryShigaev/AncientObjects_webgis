







# AncientObjects_webgis
Collaboration example of DRF(GeoDjango) and Leaflet. Django, DRF, Vue.js, Leaflet.
<br>
<br>

## Installation
<ul>
    <li>Clone this repo and go to project root</li>
    <li>Rename the file "env.example" to ".env"</li>
    <li>Make sure ports 5432 and 8000 are not busy</li>
    <li>Then use the command <code>docker-compose up --build -d</code> (-d) is option</li>
    <li>We'll have to wait a few minutes, then open the address in the browser: <code>localhost:8000</code></li>
</ul>

## Dependencies
### Database
<ul>
    <li>Postgres 15-3.3 with PostGIS extensions</li>
</ul>

### Backend
<ul>
    <li>Django 4.1.7</li>
    <li>Django Rest Framework 3.14.0</li>
    <li>Django Rest Framework GIS 1.0</li>
</ul>

### Frontend
<ul>
    <li>Vue 2</li>
    <li>Vue 2 Leaflet</li>
</ul>

## About
This project is part of a corporate project. 
It implements the management of such spatial data as points.
These points are stored in Postgres with PostGIS extension and 
can be used by other mapping applications.
<br>
Server serialize points in 'geojson' format. 
On the client side, it is possible to: filter points, add new ones, 
move, delete, update data (in addition to geometry).





