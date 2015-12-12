var http = require('http');
var express = require('express');

var app = express();

var buses_url = 'http://ibus.tbkc.gov.tw/xmlbus/GetBusData.xml';

app.get("/buses", function(req, res){
  http.get(buses_url, function(response){
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

