var lat = 22.675067;
var lng = 120.285095;
var zoom_level = 14;

//var route_polyline_url = "/route/polyline";
var route_polyline_url = "/route/polyline/8361";

var school_latlng=L.latLng(lat, lng);

var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

var map = L.map('map').setView([lat, lng], zoom_level);

L.tileLayer(
  url_template 
).addTo(map);

$.get(route_polyline_url, function(result){
  var line1 = L.polyline(
    result[0].map(function(obj){ return L.latLng(obj.lat, obj.lng);}),
    {color: 'red'}
    ).addTo(map);;

  var line2 = L.polyline(
    result[1].map(function(obj){ return L.latLng(obj.lat, obj.lng);}),
    {color: 'blue'}
    ).addTo(map);;
  map.fitBounds(line1.getBounds());

}); 

