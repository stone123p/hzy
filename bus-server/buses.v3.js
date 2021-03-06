var http = require('http');
var express = require('express');
var parser = require('xml2json'); // xml 轉 json

var app = express();

var buses_url = 'http://ibus.tbkc.gov.tw/xmlbus/GetBusData.xml';

var route_polyline_url = "http://ibus.tbkc.gov.tw/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=";

app.use(express.static('public'));

app.get("/buses", function(req, res){
  http.get(buses_url, function(response){
    var completeResponse = '';

    response.on('data', function(chunk){
      completeResponse += chunk;
    });

    response.on('end', function(){
      /*
      var result = completeResponse;
      res.send(result);
      */
      /*
      var result = parser.toJson(completeResponse); //xml 轉成 json 字串
      console.log(typeof(result));
      */
      /*
      var result = JSON.parse(parser.toJson(completeResponse)).BusDynInfo; //xml 轉成 json 字串，再轉成json物件
      console.log(typeof(result));
      */
      var result = JSON.parse(parser.toJson(completeResponse)).BusDynInfo.BusInfo.BusData; 
      console.log(typeof(result));
      res.json(result);
    });
  }).on('error', function(err){
    console.log('Got error', err.message);
    res.send("error: " + err.message);
  });
});

app.get("/route/polyline/:id", function(req, res){
  http.get(route_polyline_url + req.params.id, function(response){
    var completeResponse = '';

    response.on('data', function(chunk){
      completeResponse += chunk;
    });

    response.on('end', function(){
      var result = completeResponse.split('_@').map(function(line){
        return line.split('_|').map(function(latlng){
          return {lat: Number(latlng.split('_,')[1]), lng: Number(latlng.split('_,')[0])};
        });
      });

      res.json(result); // 直接輸出 json 物件
    });
  }).on('error', function(err){
    console.log('Got error', err.message);
    res.send("error: " + err.message);
  });
});


app.listen(3000);

