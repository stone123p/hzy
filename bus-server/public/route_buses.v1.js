var lat = 22.675067;
var lng = 120.285095;
var zoom_level = 14;

//var route = 301;
var route = 836;
var route_polyline_url = "/route/polyline/" + route;

var school_latlng=L.latLng(lat, lng);

var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

var map = L.map('map').setView([lat, lng], zoom_level);

L.tileLayer(
  url_template 
).addTo(map);

$.get(route_polyline_url, function(route_lines){
  var line1 = L.polyline(
    route_lines[0].map(function(obj){ return L.latLng(obj.lat, obj.lng);}),
    {color: 'blue'}
    ).addTo(map);

  var line2 = L.polyline(
    route_lines[1].map(function(obj){ return L.latLng(obj.lat, obj.lng);}),
    {color: 'red'}
    ).addTo(map);
  map.fitBounds(line1.getBounds());
}); 

/***  以下為新增的程式：bus ***/

var bus1Icon = L.icon({
    iconUrl: './img/bus1.png',
    iconSize:     [32, 32],
    iconAnchor:   [17, 16],
    popupAnchor:  [-3, -26]
});

var bus2Icon = L.icon({
    iconUrl: './img/bus2.png',
    iconSize:     [32, 32],
    iconAnchor:   [17, 16],
    popupAnchor:  [-3, -26]
});

var route_buses_url = "/buses/" + route;

$.get(route_buses_url, function(buses){
  buses.forEach(function(b){
    var popup = [
      "<b>",
      b.RouteID,
      "</b>",
      "<br/>車號：",
      b.BusID,
      "<br/>GoBack：",
      b.GoBack,
      "<br/>車速：",
      b.Speed,
      "公里"
    ].join('');
    var busIcon = b.GoBack === '1'? bus1Icon : bus2Icon;
    L.marker([b.Latitude, b.Longitude], {icon: busIcon})
      .addTo(map)
      .bindPopup(popup);
  });
});

