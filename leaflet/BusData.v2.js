var lat = 22.675067;  // 經度
var lng = 120.285095; // 緯度
var zoom_level = 15;  // 縮放層級

var distance = 1000;                    //<----- 設定要過濾公車資料的距離

var school_latlng=L.latLng(lat, lng);   //<----- 學校的經緯度物件

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
      "<b>",
      b.routeName,
      "</b>",
      "<br/>",
      b.routeDesc,
      "<br/>車號：",
      b.BusID,
      "<br/>距離：",
      b.distance,
      "公尺",
      "<br/>車速：",
      b.Speed,
      "公里"
    ].join('');

    L.marker([b.Latitude, b.Longitude], {icon: busIcon})
      .addTo(map)
      .bindPopup(popup);
  });
};
var getRouteData = function(busData){
  $.get('http://ibus.tbkc.gov.tw/xmlbus/StaticData/GetRoute.xml', function(xml){ 
    var routes = $.xml2json(xml).BusInfo.Route; 
    busData.forEach(function(b){
      var route = routes.find(function(r){
        if(r.ID === b.RouteID){
          return r;
        }
      });
      if(route){
        b.routeName = route.nameZh;
        b.routeDesc = route.ddesc;
      }
    });
    drawBus(busData); 
  });
};

$.get('http://ibus.tbkc.gov.tw/xmlbus/GetBusData.xml', function(xml){ 
  var json = $.xml2json(xml); 
  var busData = json.BusInfo.BusData;

  // 過濾距離在一公里內的公車資料
  var filtered_busData = busData.filter(function(bus){
    // 將原來公車的經緯度資料，轉換成 leaflet 的經緯度物件
    var bus_latlng = L.latLng(Number(bus.Latitude), Number(bus.Longitude));

    // 使用 distanceTo 方法計算距離，並記錄到每筆公車的資料內。屬性為distance
    bus.distance = Math.round(bus_latlng.distanceTo(school_latlng)); 

    // 傳回(過濾)距離小於一公里的公車資料
    return bus.distance <= distance;
  });
  getRouteData(filtered_busData);
  //getRouteData(json.BusInfo.BusData);
  //drawBus(json.BusInfo.BusData); 
});


