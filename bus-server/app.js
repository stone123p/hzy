var http = require('http');
var express = require('express');
var parser = require('xml2json');

var app = express();

var route_polyline_url = "http://ibus.tbkc.gov.tw/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=8361";

var buses_url = 'http://ibus.tbkc.gov.tw/xmlbus/GetBusData.xml';

app.get("/buses", function(req, res){
  http.get(buses_url, function(response){
    var completeResponse = '';

    response.on('data', function(chunk){
      completeResponse += chunk;
    });

    response.on('end', function(){
      var result = completeResponse;
      console.log(result);
      res.send(result);
    });
  });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});

app.get("/", function (req, res) {

  //var url = "http://ibus.tbkc.gov.tw/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=8361";
  var url = 'http://ibus.tbkc.gov.tw/xmlbus/GetBusData.xml';
  //var gsaReq = http.get('http://ibus.tbkc.gov.tw/xmlbus/GetBusData.xml', function (response) {
  var gsaReq = http.get(url, function (response) {
    var completeResponse = '';
      response.on('data', function (chunk) {
        completeResponse += chunk;
      });
      response.on('end', function() {
//        result = parser.toJson(completeResponse);
        var result = completeResponse;
        res.json(result);
        /*
        var busData = JSON.parse(result).BusDynInfo.BusInfo.BusData;
        console.log(busData);
        res.json(busData);
        */
      })
      response.on('error', function (e) {
        console.log('problem with request: ' + e.message);
      });
  });
});

app.listen(3000);

