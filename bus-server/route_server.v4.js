var http = require('http');
var express = require('express');

var app = express();

var route_polyline_url = "http://ibus.tbkc.gov.tw/bus/RealRoute/ashx/GetPolyLine.ashx?Type=GetLine&Plang=zh_tw&Data=";

app.use(express.static('public'));

app.get("/route/polyline/:id", function(req, res){
  http.get(route_polyline_url + req.params.id, function(response){
    var completeResponse = '';

    response.on('data', function(chunk){
      completeResponse += chunk;
    });

    response.on('end', function(){
      //var result = completeResponse; // 一個字串
      //var result = completeResponse.split('_@'); // 由兩個字串組成的陣列

      /* 
       * 兩條線組成一陣列。
       * 每條線為經緯度所組成的陣列。
       * 經緯度仍為字串。
      var result = completeResponse.split('_@').map(function(line){
        return line.split('_|');
      });
       */
      
      // 進一步把每個經緯度分成 {lat: xxxx, lng: yyyy}
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

