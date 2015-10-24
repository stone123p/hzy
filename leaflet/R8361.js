var lat = 22.675067;  // 經度
var lng = 120.285095; // 緯度
var zoom_level = 15;  // 縮放層級
var bus_stops_url = "http://ibus.tbkc.gov.tw/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=8361"

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
  // toLatLngs 把字串，轉成一組經緯度。
  var toLatLngs = function(str){
    return str.split('_|')
      .map(function(latlngString){
        // 小心，高雄市公車很賊，經緯度故意弄反。
        var latlng = latlngString.split('_,');
        return L.latLng(Number(latlng[1]), Number(latlng[0]));
      });
  };

  var lines = result.split('_@');

  var polyline1 = L.polyline(toLatLngs(lines[0]),{color: 'red'}).addTo(map);
  var polyline2 = L.polyline(toLatLngs(lines[1]),{color: 'blue'}).addTo(map);
  map.fitBounds(polyline1.getBounds());

}); 

