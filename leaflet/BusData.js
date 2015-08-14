var lat = 22.675067;  // 經度
var lng = 120.285095; // 緯度
var zoom_level = 13;  // 縮放層級

var busIcon = L.icon({
    iconUrl: './imgs/bus.png',
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

var drawBus = function(busData){
  busData.forEach(function(b){
    var popup = [
      "<b>公車路線：",
      b.RouteID,
      "</b>",
      "<br/>車號：",
      b.BusID,
      "<br/>車速：",
      b.Speed,
      "公里"
    ].join('');

    L.marker([b.Latitude, b.Longitude], {icon: busIcon})
      .addTo(map)
      .bindPopup(popup);
  });
};

$.get('http://ibus.tbkc.gov.tw/xmlbus/GetBusData.xml', function(xml){ 
  raw_xml = xml;
  console.log(xml);
  var json = $.xml2json(xml); 
  drawBus(json.BusInfo.BusData); 
});


