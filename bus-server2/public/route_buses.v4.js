var lat = 22.675067;  // 經度
var lng = 120.285095; // 緯度
var zoom_level = 14;  // 縮放層級
//var bus_stops_url = "http://ibus.tbkc.gov.tw/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=8361"
var bus_stops_url = "/route/polyline/92"
var school_latlng=L.latLng(lat, lng);   //<----- 學校的經緯度物件

// OpenStreetMap 的 api 網址樣板
var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

// 設定地圖的視圖。經緯度及縮放層級
var map = L.map('map').setView([lat, lng], zoom_level);

// 加入地圖的貼圖
L.tileLayer(
  url_template 
).addTo(map);

var my_marker = L.marker([lat, lng])
  .addTo(map)
  .bindPopup("<b>大家好!</b><br />拎北在這啦.")
  .openPopup();

$.get(bus_stops_url, function(result){
  var line1 = L.polyline(
    result[0].map(function(obj){return L.latLng(obj.lat,obj.lng);}),
    {color:'red'}
    ).addTo(map);;
    
  var line2 = L.polyline(
     result[1].map(function(obj){return L.latLng(obj.lat,obj.lng);}),
    {color:'blue'}
    ).addTo(map);;
map.fitBounds(line1.getBounds());
}); 

