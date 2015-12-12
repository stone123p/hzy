var http = require('http');
var express = require('express');

var app = express();

//var route_polyline_url = "http://ibus.tbkc.gov.tw/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=8361";
var route_polyline_url = "http://ibus.tbkc.gov.tw/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=";

app.use(express.static('public'));
app.get("/route/polyline/:id",function(req,res){
  http.get(route_polyline_url+req.params.id ,function(response){
    var completeResponese ='';

    response.on('data',function(chunk){
      completeResponese += chunk;
    });

    response.on('end',function(){
      var result = completeResponese ;
      res.send(result);
    });

  });
});

app.listen(3000);
