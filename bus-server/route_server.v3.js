var http = require('http');
var express = require('express');

var app = express();

//var route_polyline_url = "http://ibus.tbkc.gov.tw/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=8361"  *** 比較這行和下一行的差異
var route_polyline_url = "http://ibus.tbkc.gov.tw/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=" // 8361 拿掉了

app.use(express.static('public'));

//app.get("/route/polyline", function(req, res){ *** 比較這行和下一行的差異
app.get("/route/polyline/:id", function(req, res){ // <= 多了 :id
  //http.get(route_polyline_url, function(response){
  http.get(route_polyline_url + req.params.id, function(response){ // ??
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

