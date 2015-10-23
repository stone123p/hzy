var Dlat = 22.675067;  // 終點經度
var Dlng = 120.285095; // 終點緯度

var Olat = 22.659620; // 起點經度
var Olng = 120.31079; // 起點緯度

var zoom_level = 13;  // 縮放層級
var nameSet = new Set();
var distance = 1000;

var stopIcon = L.icon({
    iconUrl: './imgs/busStop.png',
    iconSize:     [32, 37],
    iconAnchor:   [17, 36],
    popupAnchor:  [-3, -26]
});
// OpenStreetMap 的 api 網址樣板
var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

// 設定地圖的視圖。經緯度及縮放層級
var map = L.map('map').setView([Dlat, Dlng], zoom_level);

// 加入終點標示
L.marker([Dlat, Dlng])
  .addTo(map)
  .bindPopup("終點")

var circle = L.circle([Dlat, Dlng], distance, {
        color: 'blue',
          fillColor: '#f03',
          fillOpacity: 0.5
}).addTo(map);

// 加入起點標示
L.marker([Olat, Olng])
  .addTo(map)
  .bindPopup("起點")

var circle = L.circle([Olat, Olng], distance, {
      color: 'blue',
          fillColor: '#f03',
          fillOpacity: 0.5
}).addTo(map);

// 加入地圖的貼圖
L.tileLayer(
  url_template 
).addTo(map);

//-----------------------------------------------------

//找出起點和終點附近的站牌 nearbyStops(stopDatas) return [{}...]
var drawStop = function(stopData){
  stopData.forEach(function(s){
    if(! nameSet.has(s.nameZh) && false){
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
