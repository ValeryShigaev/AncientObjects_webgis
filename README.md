







# AncientObjects_webgis
Collaboration example of DRF(GeoDjango) and Leaflet. Django, DRF, Vue.js, Leaflet.
<br>
<br>
<image src="https://downloader.disk.yandex.ru/preview/61db73158c70899eca7b475bdce79722f91103803bec7fe0407d571662b43d24/642efda4/BDCxFTBY55zKZIJUdHQScuFbr-tVbF3upXl0r_VCXEsX7O81ulyE515Ul0SqxQUvnPHe51yZPAnawZutOJrJmw%3D%3D?uid=0&filename=webmap_example.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048"></image>
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
#### Example
<ul>
    <li>Select the move option from the top menu</li>
    <li><image src="https://downloader.disk.yandex.ru/preview/e34e6b5653db73f0ca8594675ef3738de280c5fedf893b3503aa615c153f939b/642f0a43/ffQjKUVXmXzlPTnJXp-90VIZ6mdBNPWLwx95tgEA9KuY6j1JwfN8D9FU2-AHa4EXSP4VVLU5Vi3qO5W9W79ZKA%3D%3D?uid=0&filename=webmap_example1.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048"></image></li>
    <li>Select an object to move</li>
    <li><image src="https://downloader.disk.yandex.ru/preview/34206a4acf752ba44837b0e96b89b6db97f596fb67248ca6b96d55aa1de7c936/642f0b88/t6nhF7a-HoYmUvCfESVDxlIZ6mdBNPWLwx95tgEA9KsrSuvsVP3AD-BXmV68iBIj2y74PQ-LL4MxG1tNqPu4Iw%3D%3D?uid=0&filename=webmap_example2.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048"></image></li>
    <li>Choose a place on the map where to move</li>
    <li><image src="https://downloader.disk.yandex.ru/preview/ecb95af4a339837817d713820a92172f8e456a1a3b0b57df8495ee0ad530c29c/642f0c35/DklqmHfAM-m-Ng2DWR0-EXYZZhdNRCe9xCOnX9LqAGxYS9nbCdzYCFiR7QPm8wSs63VCv--9AVkNFiKPoTMatw%3D%3D?uid=0&filename=webmap_example3.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048"></image></li>
    <li>Moved. You can choose another object.</li>
</ul>





