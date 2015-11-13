var school = L.latLng(22.675067, 120.285095);
var zoom_level = 16;  // 縮放層級

// OpenStreetMap 的 api 網址樣板
var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

// 設定地圖的視圖。經緯度及縮放層級
var map = L.map('map').setView(school, zoom_level);

// 加入地圖的貼圖
L.tileLayer(
  url_template 
).addTo(map);

var circle = L.circle(school, 100, {
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.1,
      weight: 2
}).addTo(map);

