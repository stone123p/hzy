var lat = 22.675067;  // 經度
var lng = 120.285095;// 緯度
var distance = 1000;
var busIcon = L.icon({
    iconUrl: './imgs/bus.png',
    iconSize:     [32, 37],
    iconAnchor:   [17, 36],
    popupAnchor:  [-3, -26]
});

// OpenStreetMap 的 api 網址樣板
var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

// 設定地圖的視圖。經緯度及縮放層級
var map = L.map('map');

// 加入地圖的貼圖
L.tileLayer(
  url_template 
).addTo(map);

// 加入地點標示
map.on('locationfound',function(e){
  L.marker(e.latlng)
    .addTo(map)
    .bindPopup("<b>大家好!</b><br />拎北在這啦.");
  
  var circle = L.circle(e.latlng, distance, {
    color: 'blue',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map);
  
  $.get('http://ibus.tbkc.gov.tw/xmlbus/GetBusData.xml', function(xml){ 
     var json = $.xml2json(xml); 
     var busData = json.BusInfo.BusData;

     var filtered_busData = busData.filter(function(bus){
        var bus_latlng = L.latLng(Number(bus.Latitude), Number(bus.Longitude));
        bus.distance = Math.round(bus_latlng.distanceTo(e.latlng)); 
        return bus.distance <= distance;
     });
     getRouteData(filtered_busData);
   }); 
  });

map.on('locationerror',function(e){
  alert(e.message);
});

map.locate({setView: true});

var getRouteData = function(busData){
  $.get('http://ibus.tbkc.gov.tw/xmlbus/StaticData/GetRoute.xml',function(xml){
      var routeData = $.xml2json(xml).BusInfo.Route;
      busData.forEach(function(b){
        var route = routeData.find(function(r){
          return r.ID == b.RouteID;
        });
        if(route){
          b.routeName = route.nameZh;
          b.routeDesc = route.ddesc;
          b.routeDestination = route.destinationZh;
        }
      });
      drawBus(busData);
  });
}; 
var drawBus = function(busData){
  busData.forEach(function(b){
    var popup = [
      "<b>公車路線：",
      b.routeName,
      "<b><br/>往:",
      b.routeDestination,
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

