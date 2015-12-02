var Olat = 22.675067;  // 終點經度
var Olng = 120.285095; // 終點緯度

var Dlat = 22.67749; // 起點經度
var Dlng = 120.31605; // 起點緯度

var zoom_level = 13;  // 縮放層級
var distance = 1000;

var bus_stops_url = "http://122.146.229.210/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=";
//http://ibus.tbkc.gov.tw/bus/RealRoute/ashx/RealRoute.ashx?Type=GetGroupStop&Lang=Tw&Data=8361
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

var route_layer_group = L.layerGroup().addTo(map);

// 加入終點標示
L.marker([Dlat, Dlng])
  .addTo(map)
  .bindPopup("終點")


// 加入起點標示
L.marker([Olat, Olng])
  .addTo(map)
  .bindPopup("起點")


// 加入地圖的貼圖
L.tileLayer(
  url_template 
).addTo(map);

//------------------------------------------------------------------------------------------------------------------------------------------------------

//找出附近的站牌 getNearbyStops(stopDatas,latlng) return [{routeId,nameZh,seqNo,GoBack,latitude,longitude}...]
var getNearbyStops = function(stopDatas,latlng){
  var stops = [];
  stopDatas.forEach(function(Data){
    var stop_latlng = L.latLng(Number(Data.latitude), Number(Data.longitude));
    if(Math.round(stop_latlng.distanceTo(latlng))<=distance){
      stops.push(
        {"routeId":Data.routeId,"nameZh":Data.nameZh,"seqNo":Data.seqNo,"GoBack":Data.GoBack,"latitude":Data.latitude,"longitude":Data.longitude}
      );
    }
  });
  return stops;
};
//找出有起點和終點共通路線 getComRuntes(stopsNearbyO,stopsNearbyD) return [routeId...]
var getComRuntes = function(stopsNearbyO,stopsNearbyD){
  var routes = [];
  for(var i =0; i<stopsNearbyO.length;i++){
    for(var j=0 ;j<stopsNearbyD.length;j++){
      if(stopsNearbyO[i].routeId==stopsNearbyD[j].routeId){routes.push(stopsNearbyD[j].routeId)}
    }
  }
  return routes;
};
//過濾出有共通路線之車站   filterStopsOfComRoutes(stopDatas,routeIds) return[{routeId,nameZh,seqNo,GoBack,latitude,longitude}...]
var filterStopsOfComRoutes = function(stopDatas,routeIds){
  return stopDatas.filter(function(data){
    return routeIds.indexOf(data.routeId)!=-1;
  });
};
//找出正確有方向的路線之站牌 getTureDirStops(stopDatasOfNearO,stopDatasOfNearD) return[{routeId,nameZh,seqNo,GoBack,latitude,longitude}...]
var getTureDirStops = function(stopDatasOfNearO,stopDatasOfNearD){
  var stops = [];
  for(var i=0;i<stopDatasOfNearO.length;i++){
    for(var j=0;j<stopDatasOfNearD.length;j++){
      if(stopDatasOfNearO[i].GoBack==stopDatasOfNearD[j].GoBack &&
         stopDatasOfNearO[i].routeId==stopDatasOfNearD[j].routeId &&
         Number(stopDatasOfNearO[i].seqNo)<Number(stopDatasOfNearD[j].seqNo)){
        stops.push(stopDatasOfNearO[i]);
        stops.push(stopDatasOfNearD[j]);
      }
    }
  }
  return stops;
};
//畫站牌
var drawStop = function(stopData){
  stopData.forEach(function(s){
    var popup = [
      s.routeId,
      "<br>",
      s.nameZh,
      "<br>",
      (s.GoBack==1)?"去程":"回程",
    ].join('');

    stop = L.marker([s.latitude, s.longitude], {icon: stopIcon})
      .addTo(map)
      .bindPopup(popup);

    stop.on('click', function(e){
       drawRoute(s.routeId,s.GoBack);
    });
  });
};
var drawRoute = function(routeId,GoBack){
  $.get('http://ibus.tbkc.gov.tw/xmlbus/StaticData/GetRoute.xml', function(xml){ 
    var routes = $.xml2json(xml).BusInfo.Route; 
    var routeData = routes.filter(function(r){
          return r.nameZh===routeId;
        });
    $.get(bus_stops_url+routeData[0].ID, function(result){
    var toLatLngs = function(str){
      return str.split('_|').map(function(latlngString){
        var latlng = latlngString.split('_,');
        return L.latLng(Number(latlng[1]), Number(latlng[0]));
      });
    };
    route_layer_group.clearLayers();
    route_layer_group.addLayer(L.polyline(toLatLngs(result.split('_@')[(GoBack==1)?0:1]),{color: (GoBack==1)?'blue':'red'}).addTo(map)); 
/*  result.split('_@').forEach(function(line, i){
        L.polyline(line.split('_|').map(function(p){ 
          clearMap();
          return L.latLng(Number(p.split('_,')[1]), Number(p.split('_,')[0]));}), {color: ["red",  "blue"][i]
        }).addTo(map);
      });*/
    });
  });
};
$.get('./DownLoadSrc.xml', function(xml){ 
  var json = $.xml2json(xml);
  var stopsNearbyO = getNearbyStops(json.BusInfo.Stop,[Olat,Olng]);
  var stopsNearbyD = getNearbyStops(json.BusInfo.Stop,[Dlat,Dlng]);
  var UnionOfStops =stopsNearbyD.concat(stopsNearbyO);//終點和起點附近站牌做聯集
  drawStop(getTureDirStops(getNearbyStops(filterStopsOfComRoutes(UnionOfStops,getComRuntes(stopsNearbyO,stopsNearbyD)),[Olat,Olng]),
                           getNearbyStops(filterStopsOfComRoutes(UnionOfStops,getComRuntes(stopsNearbyO,stopsNearbyD)),[Dlat,Dlng])
                           ));
});
