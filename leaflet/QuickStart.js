var lat = 22.719078;  // 經度
var lng = 120.298640; // 緯度
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
  .openPopup();

map.on('click', function(e){
  //alert('經緯度: ' + e.latlng);
  L.popup()
      .setLatLng(e.latlng)
      .setContent('經緯度: ' + e.latlng.toString())
      .openOn(map);
});
