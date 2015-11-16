var school = L.latLng(22.675067,120.285095);
var zoom_level=16;

var url_template='http://{s}.tile.osm.org/{z}/{x}/{y}.png';

var map=L.map('map').setView(school,zoom_level);

L.tileLayer(
  url_template
).addTo(map);

var circle = L.circle(school,100,{
    color:'blue',
    fillColor:'blue',
    fillOpacity:0.1,
    weight:2
}).addTo(map);
var stopIcon= L.icon({
  iconUrl: './busstop.png',
        iconSize:     [32, 37],
        iconAnchor:   [17, 36],
        popupAnchor:  [-3, -26]
});

var bus_stops_url = "http://data.kaohsiung.gov.tw/Opendata/DownLoadSrc.aspx?CaseNo1=AP&CaseNo2=15&Lang=C&FolderType="

var bus_layer_group = L.layerGroup().addTo(map);
var data_ready = false;

var busStops;


$.get(bus_stops_url, function(xml){ 
    var json = $.xml2json(xml); 
    busStops= json.BusInfo.Stop;
    data_ready = true;
});

var showBusStops = function(loc, r){
  if(!data_ready) return;
  bus_layer_group.clearLayers();

  busStops
    .filter(function(s){
      var stopLoc = L.latLng(Number(s.latitude), Number(s.longitude));
      return loc.distanceTo(stopLoc) <= r;
    })
    .forEach(function(s){
      bus_layer_group.addLayer(L.marker([s.latitude, s.longitude], {icon: stopIcon}));
    });
};


