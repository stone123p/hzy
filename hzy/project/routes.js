var bus_stops_url = "http://data.kaohsiung.gov.tw/Opendata/DownLoadSrc.aspx?CaseNo1=AP&CaseNo2=15&Lang=C&FolderType="
var routes_url="http://ibus.tbkc.gov.tw/xmlbus/StaticData/GetRoute.xml"
var distance = 600;
var origin = L.latLng(22.657459, 120.302431);
//var origin = L.latLng(22.659455, 120.311163);
var destination=L.latLng(22.675067, 120.285095);   

var origin_stops;
var destination_stops;
var bus_stops;
var routes;

$.get(bus_stops_url, function(xml){ 
  var json = $.xml2json(xml); 
  bus_stops = json.BusInfo.Stop;
  $.get(routes_url, function(xml){
    routes = $.xml2json(xml).BusInfo.Route;
    main();
  });
});

var main = function(){
  origin_stops = busStopsNear(origin, distance);
  destination_stops = busStopsNear(destination, distance);

  var stops = {
    "origin":{
      "goback1": getStopsByGoBack(origin_stops, '1'),
      "goback2": getStopsByGoBack(origin_stops, '2')
    },
    "destination":{
      "goback1": getStopsByGoBack(destination_stops, '1'),
      "goback2": getStopsByGoBack(destination_stops, '2')
    }
  };
  var bus_routes = {
    "origin":{
      "goback1": getRouteSetByStops(stops.origin.goback1),
      "goback2": getRouteSetByStops(stops.origin.goback2)
    },
    "destination":{
      "goback1": getRouteSetByStops(stops.destination.goback1),
      "goback2": getRouteSetByStops(stops.destination.goback2)
    }
  };
  var intersect_routes = {
    "goback1": interset(bus_routes.origin.goback1, bus_routes.destination.goback1),
    "goback2": interset(bus_routes.origin.goback2, bus_routes.destination.goback2)
  };
  console.log('GoBack = 1');
  intersect_routes.goback1.forEach(function(value){
    console.log(value.nameZh + ' : ' + value.ddesc);
  });
  console.log('GoBack = 2');
  intersect_routes.goback2.forEach(function(value){
    console.log(value.nameZh + ' : ' + value.ddesc);
  });
}
var interset = function(set1, set2){
  var inter = new Set();
  set1.forEach(function(s){
    if(set2.has(s)){
      inter.add(s);
    }
  });
  return inter;
}
var busStopsNear = function(loc, dist){
  var stops = [];
  bus_stops.forEach(function(s){
    if(L.latLng(Number(s.latitude), Number(s.longitude)).distanceTo(loc) < dist){
      stops.push(s);
    }
  });
  return stops;
};


var getStopsByGoBack = function(stops, goback){
  return stops.filter(function(s){
//    console.log(s.routeId + ' : ' + s.nameZh + ' Goback: ' + goback);
    return s.GoBack == goback;
  });
};

var getRouteSetByStops = function(stops){
  var routeSet = new Set();
  stops.forEach(function(s){
    getRoutesByStop(s).forEach(function(r){
      routeSet.add(r);
    });
  });
  console.log('Go back: ' + stops[0].GoBack);
  routeSet.forEach(function(r){
    console.log(r.ID + ' :  ' + r.nameZh + '  <==>  ' + r.ddesc);
  });
  return routeSet;
};

var getRoutesByStop = function(stop){
  return routes.filter(function(r){
//    return stop.routeId === r.ID;
    return stop.routeId === r.ID || r.nameZh.indexOf(stop.routeId) > -1;
  });
};

