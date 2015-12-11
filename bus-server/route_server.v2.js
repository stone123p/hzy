var http = require('http');
var express = require('express');

var app = express();

var route_polyline_url = "http://ibus.tbkc.gov.tw/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=8361"

app.use(express.static('public'));      // +++ 使用 public 放靜態檔案。

app.get("/route/polyline", function(req, res){
  http.get(route_polyline_url, function(response){
    var completeResponse = '';

    response.on('data', function(chunk){
      completeResponse += chunk;
    });

    response.on('end', function(){
      var result = completeResponse;
      res.send(result);
    });
  }).on('error', function(err){
    console.log('Got error', err.message);
    res.send("error: " + err.message);
  });
});


app.listen(3000);

