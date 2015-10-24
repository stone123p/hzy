var lat = 22.675067;  // 經度
var lng = 120.285095; // 緯度
var zoom_level = 16;  // 縮放層級

var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

var map = L.map('map').setView([lat, lng], zoom_level);

L.tileLayer(
  url_template 
).addTo(map);


var startMarker = null;
var destMarker = null;

map.on('click', function(e){
  var createButton = function(label, container){
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
  }

  var container = L.DomUtil.create('div');
  var startBtn = createButton('起點', container);
  var destBtn = createButton('終點', container);

  L.popup()
    .setContent(container)
    .setLatLng(e.latlng)
    .openOn(map);

  L.DomEvent.on(startBtn, 'click', function(){
    if(startMarker === null){
      startMarker = L.marker(e.latlng).addTo(map);
    }else{
      startMarker.setLatLng(e.latlng);
    }
    map.closePopup();
  });

  L.DomEvent.on(destBtn, 'click', function(){
    if(destMarker === null){
      destMarker = L.marker(e.latlng).addTo(map);
    }else{
      destMarker.setLatLng(e.latlng);
    }
    map.closePopup();
  });
});

