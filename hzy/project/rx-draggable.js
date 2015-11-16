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

var createButton = function(label, container){
  var btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
}

var container = L.DomUtil.create('div');
var startBtn = createButton('起點', container);
var destBtn = createButton('終點', container);

  L.DomEvent.on(startBtn, 'click', function(){
    if(startMarker === null){
      startMarker = L.marker(e.latlng, {draggable: true}).addTo(map);
      L.DomEvent.on(startMarker, 'dragend', function(){
        console.log("起點的經緯度：" + this.getLatLng());
      });
    }else{
      //startMarker.setLatLng(this.getLatlng());
    }
    map.closePopup();
  });
/*
  L.DomEvent.on(destBtn, 'click', function(e){
    if(destMarker === null){
      destMarker = L.marker(e.latlng, {draggable: true}).addTo(map);
      L.DomEvent.on(destMarker, 'dragend', function(){
        console.log("終點的經緯度：" + this.getLatLng());
      });
    }else{
      //destMarker.setLatLng(this.getLatlng());
    }
    map.closePopup();
    console.log(e.target);
  });
*/
/*
map.on('click', function(e){
  L.popup()
    .setContent(container)
    .setLatLng(e.latlng)
    .openOn(map);

});
*/
Rx.Observable.fromEvent(destBtn, 'click')
  .subscribe(function(e) {
    console.log(e);
    map.closePopup();
  });

Rx.Observable.fromEvent(map, 'click')
  .subscribe(function(e) {
    L.popup()
    .setContent(container)
    .setLatLng(e.latlng)
    .openOn(map);
  });
