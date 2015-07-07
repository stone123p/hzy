var express= require('express');


var app = express();

var port = process.env.PORT || 3000;

app.listen(port);

app.get('/', function(req, res){
  res.send('江西來的老師：馬芙丸');
});

console.log('Running server on port: ' + port);
