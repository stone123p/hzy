// server.js

// 涵括 express 函式庫
var express=require('express');

//var path = require('path');

// 將express模組指定到 app 變數
var app=express();


var imgs = [                      // <--- 定義 imgs 陣列，存放圖片的網址。
  "./img/car01.jpg", 
  "./img/car02.jpg", 
  "./img/car03.jpg", 
  "./img/car04.jpg", 
  "./img/car05.jpg", 
  "./img/car06.jpg" 
];
// 指定網站伺服器的埠號 3000
var port = process.env.PORT || 3000;

app.use(function(req, res, next){   // <--- 新增 Middleware 
  console.log(req.url);             // 記錄存取網址
  next();                           // 執行下一個 Middleware
                                    // 若後端Server不須繼續處理者，就不用
                                    // 執行 next();
});

app.get('/cars', function(req, res){ // <--- 路徑 Middleware
  res.json(imgs);                    // imgs陣列轉成JSON格式，回應給瀏覽器
});

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

// 網站伺服器啟動，並接聽3000埠號
app.listen(port);

// 在 console 列印伺服器啟動的訊息。
console.log('Running server on port:' + port);
