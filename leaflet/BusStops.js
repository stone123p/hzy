var lat = 22.675067;  // 經度
var lng = 120.285095; // 緯度
var zoom_level = 15;  // 縮放層級
var bus_stops_url = "http://data.kaohsiung.gov.tw/Opendata/DownLoadSrc.aspx?CaseNo1=AP&CaseNo2=15&Lang=C&FolderType="

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

$.get(bus_stops_url, function(xml){ 
  var json = $.xml2json(xml); 
  var bus_stops = json.BusInfo.Stop;
  var bus_set = new Set();
  bus_stops.forEach(function(s){
    if(!bus_set.has(s.nameZh)){
      bus_set.add(s.nameZh);
      var circle = L.circle([s.latitude, s.longitude], 5, {
            color: 'blue',
            fillColor: '#f03',
            fillOpacity: 0.5
      }).addTo(map).bindPopup(s.nameZh);
    }
  });
});


