var lat = 22.675067;
var lng = 120.285095;
var zoom_level = 14;

//var route_polyline_url = "/route/polyline";
var route_polyline_url = "/route/polyline/92";

var school_latlng=L.latLng(lat, lng);

var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

var map = L.map('map').setView([lat, lng], zoom_level);

L.tileLayer(
  url_template 
).addTo(map);

$.get(route_polyline_url, function(result){
  result.split('_@').forEach(function(line, i){
    L.polyline(line.split('_|').map(function(p){ 
      return L.latLng(Number(p.split('_,')[1]), Number(p.split('_,')[0]));}), {color: ["red",  "blue"][i]
    }).addTo(map);
  });

}); 

