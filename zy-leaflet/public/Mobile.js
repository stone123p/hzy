var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
var map = L.map('map');

L.tileLayer(
  url_template
).addTo(map);

map.on('locationfound',function(e){
  L.marker(e.latlng)
    .addTo(map)
    .bindPopup("拎北在這啦")
    .openPopup();;
});

map.on('locationerror',function(e){
  alert(e.message);
});

map.locate({setView: true});
