var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

var map = L.map('map');

L.tileLayer(
  url_template 
).addTo(map);

// 定義定位的事件處理函式
map.on('locationfound', function(e){
  L.marker(e.latlng).addTo(map);
});

map.on('locationerror', function(e){
  alert(e.messae);
});

// 進行定位，
// 訂位成功時，執行 locationfound。
// 失敗，執行 locationerror。
map.locate({setView: true});
