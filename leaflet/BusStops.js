var lat = 22.675067;  // 經度
var lng = 120.285095; // 緯度
var zoom_level = 15;  // 縮放層級
var bus_stops_url = "http://data.kaohsiung.gov.tw/Opendata/DownLoadSrc.aspx?CaseNo1=AP&CaseNo2=15&Lang=C&FolderType="

var distance = 1000;                    //<----- 設定要過濾公車資料的距離

var stopIcon = L.icon({
    iconUrl: './imgs/busstop.png',
    iconSize:     [32, 37],
    iconAnchor:   [17, 36],
    popupAnchor:  [-3, -26]
});
var school_latlng=L.latLng(lat, lng);   //<----- 學校的經緯度物件

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

var bus_layer_group = L.layerGroup().addTo(map);
var bus_layers = [];
var data_ready = false;

$.get(bus_stops_url, function(xml){ 
  var json = $.xml2json(xml); 
  var bus_stops = json.BusInfo.Stop;
  var bus_set = new Set();
  var bus_markers;
  bus_stops.forEach(function(s){
    var key = s.latitude + s.longitude + s.GoBack;
    if(!bus_set.has(key)){
      var popup = [
        "<b>站牌: " + s.nameZh + "</b>",
        "路線: " + s.routeId,
        s.GoBack === '1'? "去程": "回程" 
      ].join('<br/>');
      bus_set.add(key);
      bus_layers.push(
        L.marker([s.latitude, s.longitude], {icon: stopIcon})
          .bindPopup(popup)
      );
    }
  });
  data_ready = true;
  map.addEventListener('click', giveMeBusStops);
  console.log('Data is ready');
});

var giveMeBusStops = function(e){
  if(!data_ready){
    return;
  }
  bus_layer_group.clearLayers();
  bus_layers.forEach(function(bl){
    if(bl.getLatLng().distanceTo(e.latlng) < distance){
      bus_layer_group.addLayer(bl);
    }
  });  
}


