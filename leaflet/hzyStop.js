var lat = 22.675067;  // 經度
var lng = 120.285095; // 緯度
var zoom_level = 13;  // 縮放層級
var nameSet = new Set();

var stopIcon = L.icon({
    iconUrl: './imgs/busStop.png',
    iconSize:     [32, 37],
    iconAnchor:   [17, 36],
    popupAnchor:  [-3, -26]
});
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

var drawStop = function(stopData){
  stopData.forEach(function(s){
    if(! nameSet.has(s.nameZh) && s.routeId=="紅36"){
        var popup = [
        "<b>",
        s.nameZh,
        "<br>",
        s.GoBack,
      ].join('');

      L.marker([s.latitude, s.longitude], {icon: stopIcon})
        .addTo(map)
        .bindPopup(popup);
    }
  });
};

$.get('./DownLoadSrc.xml', function(xml){ 
  var json = $.xml2json(xml); 
  drawStop(json.BusInfo.Stop); 
});
