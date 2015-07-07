// 涵括 express 函式庫
var express= require('express');

// 將express模組指定到 app 變數
var app = express();

// 指定網站伺服器的埠號 3000
var port = process.env.PORT || 3000;


// 使用 get 中介層函式，定義路徑及對應的處理函式。
app.get('/', function(req, res){
  res.send('江西來的老師：馬芙丸'); //使用res回應物件，送出字串
});

// 網站伺服器啟動，並接聽3000埠號
app.listen(port);

// 在 console 列印伺服器啟動的訊息。
console.log('Running server on port: ' + port);
