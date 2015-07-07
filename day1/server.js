// 涵括 express 函式庫
var express=require('express');

var path = require('path');

// 將express模組指定到 app 變數
var app=express();

// 指定網站伺服器的埠號 3000
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// 網站伺服器啟動，並接聽3000埠號
app.listen(port);
// 在 console 列印伺服器啟動的訊息。
console.log('Running server on port:' + port);
