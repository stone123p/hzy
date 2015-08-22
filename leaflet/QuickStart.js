var lat = 22.675067;  // 經度
var lng = 120.285095; // 緯度
var zoom_level = 16;  // 縮放層級
var distance = 0.001;
var offset = 0.0025;

// OpenStreetMap 的 api 網址樣板
var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

// 設定地圖的視圖。經緯度及縮放層級
var map = L.map('map').setView([lat, lng], zoom_level);

// 加入地圖的貼圖
L.tileLayer(
  url_template 
).addTo(map);

// 加入地點標示
L.marker([lat, lng])
  .addTo(map)
  .bindPopup("<b>大家好!</b><br />拎北在這啦.")
  .openPopup()
  .on('click', function(e){
    console.log(e.latlng);
  });
var circle = L.circle([lat, lng - 0.002], 100, {
      color: 'blue',
      fillColor: '#f03',
      fillOpacity: 0.5
}).addTo(map);

lat += offset;
lng += offset;

var polygon = L.polygon([
  [lat - distance, lng - distance],
  [lat + distance, lng - distance],
  [lat - distance, lng + distance]
]).addTo(map);

circle.bindPopup("拎北圓仔啦");

polygon.bindPopup("拎北角仔頭");

map.on('click', function(e){
  //alert('經緯度: ' + e.latlng);
  L.popup()
      .setLatLng(e.latlng)
      .setContent('經緯度: ' + e.latlng.toString())
      .openOn(map);
});
