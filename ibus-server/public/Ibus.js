var Olatlng=null;

var Dlatlng=null;
var Dlat=22.675966; 
var Dlng=120.283328;

var zoom_level = 13;  // 縮放層級
var distance = 1000;

var stopIcon = L.icon({
    iconUrl: './imgs/busstop.png',
    iconSize:     [32, 37],
    iconAnchor:   [17, 36],
    popupAnchor:  [-3, -26]
});
// OpenStreetMap 的 api 網址樣板
var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

var geocoder = new google.maps.Geocoder();
// 設定地圖的視圖。經緯度及縮放層級
var map = L.map('map').setView([Dlat, Dlng], zoom_level);

var route_layer_group = L.layerGroup().addTo(map);
var bus_layer_group = L.layerGroup().addTo(map);
var stop_layer_group = L.layerGroup().addTo(map);

// 加入地圖的貼圖
L.tileLayer(
  url_template 
).addTo(map);

var busIcon = L.icon({
    iconUrl: './imgs/bus.png',
    iconSize:     [50, 50],
    iconAnchor:   [17, 36],
    popupAnchor:  [-3, -26]
});

var startMarker = null;
var destMarker = null;
var Address=["",""];
//------------------------------------------------------------------------------------------------------------------------------------------------------
//顯示地址
var showAddress = function(s,lat,lng){
  var od=["o","d"];
  var coord = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': coord }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results) { 
        document.getElementById(od[s]).value=results[0].formatted_address;
        console.log(results[0].formatted_address);
        Address[s]=results[0].formatted_address;
      }
    }
    else {
      alert("Reverse Geocoding failed because: " + status);
    }
  });
};
//地址轉經緯度
var transAddress = function(s){
  $.get("/transAddress/"+address,function(Location){
    if(s=0){
      Olatlng=L.latLng(Number(Location.lat),Number(Location.lng));
    }else{
      Dlatlng=L.latLng(Number(Location.lat),Number(Location.lng));
    }
  });
};
//起點終點位置交換
var switchPosition = function(){
 var buffer;
  buffer=Olatlng;
  Olatlng=Dlatlng;
  Dlatlng=buffer;

  startMarker.setLatLng(Olatlng);
  destMarker.setLatLng(Dlatlng);
  showAddress(0,Olatlng.lat,Olatlng.lng);
  showAddress(1,Dlatlng.lat,Dlatlng.lng);
  if(Olatlng != null && Dlatlng !=null){
     main(Olatlng,Dlatlng);
  }
};

map.on('click', function(e){
  var createButton = function(label, container){
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
  }

  var container = L.DomUtil.create('div');
  var startBtn = createButton('起點', container);
  var destBtn = createButton('終點', container);

  L.popup()
    .setContent(container)
    .setLatLng(e.latlng)
    .openOn(map);

  L.DomEvent.on(startBtn, 'click', function(){
    if(startMarker === null){
      startMarker = L.marker(e.latlng).bindPopup("起點").addTo(map);
    }else{
      stop_layer_group.clearLayers();
      startMarker.setLatLng(e.latlng);
    }
    
    Olatlng=e.latlng;
    showAddress(0,e.latlng.lat,e.latlng.lng)
    if(Olatlng != null && Dlatlng !=null){
      main(Olatlng,Dlatlng);
    }
    map.closePopup();
  });

  L.DomEvent.on(destBtn, 'click', function(){
    if(destMarker === null){
      destMarker = L.marker(e.latlng).bindPopup("終點").addTo(map);
    }else{
      stop_layer_group.clearLayers();
      destMarker.setLatLng(e.latlng);
    }
    Dlatlng=e.latlng;
    showAddress(1,e.latlng.lat,e.latlng.lng)
    if(Olatlng != null && Dlatlng !=null){
      main(Olatlng,Dlatlng);
    };
    map.closePopup();
  });
});

//找出附近的站牌 getNearbyStops(stopDatas,latlng) return [{stopId,stopName,routeId,routeName,seqNo,GoBack,latitude,longitude}...]
var getNearbyStops = function(stopDatas,latlng){
  var stops = [];
  stopDatas.forEach(function(Data){
    var stop_latlng = L.latLng(Number(Data.latitude), Number(Data.longitude));
    if(Math.round(stop_latlng.distanceTo(latlng))<=distance){
      stops.push(
         {"stopId":Data.stopId,
          "stopName":Data.stopName,
          "routeId":Data.routeId,
          "routeName":Data.routeName,
          "seqNo":Data.seqNo,
          "GoBack":Data.GoBack,
          "latitude":Data.latitude,
          "longitude":Data.longitude}
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
  var stops = new Set();
  for(var i=0;i<stopDatasOfNearO.length;i++){
    for(var j=0;j<stopDatasOfNearD.length;j++){
      if(stopDatasOfNearO[i].GoBack==stopDatasOfNearD[j].GoBack &&
         stopDatasOfNearO[i].routeId==stopDatasOfNearD[j].routeId &&
         Number(stopDatasOfNearO[i].seqNo)<Number(stopDatasOfNearD[j].seqNo)){
        stops.add(stopDatasOfNearO[i]);
        stops.add(stopDatasOfNearD[j]);
      }
    }
  }
  return[...stops];
};
//畫站牌
var drawStop = function(stopData){
  stopData.forEach(function(s){
    var popup = [
      "站牌名稱：",
      s.stopName,
      "<br>",
      "路線名稱：",
      s.routeName,
      "<br>",
      "站序：",
      s.seqNo,
      "<br>",
      "方向：",
      (s.GoBack==1)?"去程":"回程",
    ].join('');
    stop = L.marker([s.latitude, s.longitude], {icon: stopIcon}).bindPopup(popup);
    stop_layer_group.addLayer(stop);
  });
};
//劃路線
var drawRoute = function(routeName,routeId,GoBack){
  $.get("/GetPolyLine/"+routeId, function(result){
    var toLatLngs = function(str){
      return str.split('_|').map(function(latlngString){
        var latlng = latlngString.split('_,');
        return L.latLng(Number(latlng[1]), Number(latlng[0]));
      });
    };
    route_layer_group.clearLayers();
    route_layer_group.addLayer(L.polyline(toLatLngs(result.split('_@')[(GoBack==1)?0:1]),{color: (GoBack==1)?'blue':'red'}).addTo(map)); 
 });
};
//取得公車資料
var getBusData = function(routeName,routeId,GoBack){
  $.get('/GetBusData', function(busData){ 
    drawBus(busData.filter(function(d){
      return d.RouteID===routeId && d.GoBack===GoBack;
    }),routeName,GoBack);
  });
};
//畫公車
var drawBus = function(busData,routeName){
  busData.forEach(function(b){
    var popup = [
      "<b>路線：",
      routeName,
      "</b>",
    ].join('');
  bus_layer_group.addLayer( L.marker([b.Latitude, b.Longitude], {icon: busIcon}).bindPopup(popup));
  });
};
//顯示到達時間
var comeTimeOfBus = function(routeId,goBack){
  $.get('/comeTime/'+routeId+"/"+goBack, function(json){
   var table = document.getElementById("busComeTime");
   var html="";
   json.forEach(function(list){
    html+="<tr><td>"+list.seq+"</td><td>"
                    +list.stopName+"</td><td>"
                    +list.stopId+"</td><td>"
                    +list.comeTime+"</td></tr>" 
   });
   table.innerHTML=html;
  });
};
var maindata=[];
//顯示路線清單
var showListOfRoute = function(routeLists){
  var table = document.getElementById("routeList");
  var html="";
  var list=new Set();
  routeLists.forEach(function(r){
    list.add(r.routeName);
  });
  var i=0;
  [...list].forEach(function(r){
    html+="<tr><td>"+r+"</td><td><button onclick=selectOneRoute(\""+r+"\") >查詢</button></td><tr>";
    i++;
  });
  table.innerHTML=html;
}
//選擇其中一個路線
var selectOneRoute = function(s){
  stop_layer_group.clearLayers(); 
  var dd=maindata.filter(function(d){
    return d.routeName===s;
  });
  drawStop(dd);
  comeTimeOfBus(dd[0].routeId,dd[0].GoBack);
  drawRoute(dd[0].routeName,dd[0].routeId,dd[0].GoBack);
  getBusData(dd[0].routeName,dd[0].routeId,dd[0].GoBack);
};
var main = function(O,D){
  $.get('/RealRoute', function(json){
    stop_layer_group.clearLayers();
    bus_layer_group.clearLayers();
    route_layer_group.clearLayers();
    var stopsNearbyO = getNearbyStops(json,O);
    var stopsNearbyD = getNearbyStops(json,D);
    var UnionOfStops = stopsNearbyD.concat(stopsNearbyO);//終點和起點附近站牌做聯集
    var comRoutes    = filterStopsOfComRoutes(UnionOfStops,getComRuntes(stopsNearbyO,stopsNearbyD));//共通路線
    maindata=getTureDirStops(getNearbyStops(comRoutes,Olatlng),getNearbyStops(comRoutes,Dlatlng));
    showListOfRoute(maindata);
  });
};
