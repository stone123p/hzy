var http = require('http');
var express = require('express');
var parser = require('xml2json');
var AllofRoultList = require('./AllofRoultList.js');

var app = express();
var GetRoute_url = "http://ibus.tbkc.gov.tw/xmlbus/StaticData/GetRoute.xml";
var GetBusData_url="http://ibus.tbkc.gov.tw/xmlbus/GetBusData.xml";
var GetPolyLine_url = "http://122.146.229.210/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=";
var RealRoute_url="http://ibus.tbkc.gov.tw/bus/NewAPI/RealRoute.ashx?type=GetStop&Data=";
var comeTime_url="http://ibus.tbkc.gov.tw/bus/newAPI/GetEstimateTime.ashx?type=web&routeid=";
app.use(express.static('public'));

app.get("/comeTime/:routeId/:goBack",function(req, res){
  http.get(comeTime_url+ req.params.routeId, function(response){
    var completeResponse = '';

    response.on('data', function(chunk){
      completeResponse += chunk;
    });

    response.on('end', function(){
      var data = JSON.parse(completeResponse)[req.params.goBack-1].cometime;  
      res.json(data.map(function(comeData){
        return{
          comeTime:(Number(comeData.cometime)<60)?comeData.cometime+"分鐘":comeData.cometime,
          seq:comeData.seq,
          stopId:comeData.stopid,
          stopName:comeData.stopname
        };
      }));
    }).on('error', function(err){
      console.log('Got error', err.message);
      res.send("error: " + err.message);
    });
  });
});

app.get("/GetBusData", function(req, res){//即時公車資料
  
  http.get(GetBusData_url, function(response){
    var completeResponse = '';

    response.on('data', function(chunk){
      completeResponse += chunk;
    });

    response.on('end', function(){
      var busData = JSON.parse(parser.toJson(completeResponse)).BusDynInfo.BusInfo.BusData;  
      res.json(busData);
      });
    }).on('error', function(err){
      console.log('Got error', err.message);
      res.send("error: " + err.message);
    });
});
app.get("/GetPolyLine/:id", function(req, res){//路線經緯度
  
  http.get(GetPolyLine_url+ req.params.id, function(response){
    var completeResponse = '';

    response.on('data', function(chunk){
      completeResponse += chunk;
    });

    response.on('end', function(){
      res.send(completeResponse);
    });
    }).on('error', function(err){
      console.log('Got error', err.message);
      res.send("error: " + err.message);
    });
});
var allStops=[];
app.get("/RealRoute", function(req, res){//路線經緯度
  res.json(allStops);
});
AllofRoultList.forEach(function(list){
  http.get(RealRoute_url+list.id+"_,"+list.goBack , function(response){
    var completeResponse = '';

    response.on('data', function(chunk){
      completeResponse += chunk;
    });

    response.on('end', function(){
      try {
        var dd = JSON.parse(completeResponse)
          allStops=allStops.concat(dd.map(function(data){
            return {
              stopId:data.Id,
              stopName:data.nameZh,
              routeId:list.id,
              routeName:list.NameZh,
              seqNo:data.seqNo,
              GoBack:list.goBack,
              latitude:data.latitude,
              longitude:data.longitude
            };
          }));
      } catch(e){
      }
    });
    }).on('error', function(err){
      console.log('Got error', err.message);
    });
});
app.listen(3000);
