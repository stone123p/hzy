var school = L.latLng(22.675067,120.285095);
var zoom_level=16;

var url_template='http://{s}.tile.osm.org/{z}/{x}/{y}.png';

var map=L.map('map').setView(school,zoom_level);

L.tileLayer(
  url_template
).addTo(map);

var circle = L.circle(school,100,{
    color:'blue',
    fillColor:'blue',
    fillOpacity:0.1,
    weight:2
}).addTo(map);
