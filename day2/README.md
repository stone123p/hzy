# Day2
------

index.html：
```
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'/>
  <title>Minions</title>
</head>
<body>
  <h1>小小兵</h1>
  <img src='/img/minions.jpg'>
</body>
</html>
```
dynamic.html:
```
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'/>
  <title>Minions</title>
</head>
<body>
  <h1>小小兵</h1>
  <img src='./img/minions.jpg'>
  <h2>以下由Javascript動態產生：</h2>
  <div id='dynamic' />
  <script type='text/javascript'>
    var dynamic = document.getElementById('dynamic');
    var n = 5;
    for(var i = 0; i < n; i++){
      var img = document.createElement('img');
      img.src = './img/minions.jpg';
      dynamic.appendChild(img);
    }
  </script>
</body>
</html>
```
------
習題 ex_2_1
------
改寫上面javascrip:
一. 寫一個 addImage 函式。函式的參數為:
1. src => 圖片的網址
2. ele => 要加入的DOM 物件。
```
var addImage = function(src, ele){
}
```
二. 在 for 迴圈中使用這個 addImage 函式。
------
## 玩玩瀏覽器的Javascript Console
```
var arr = [];

for(var i = 0; i < 360; i+= 45) arr.push(i * Math.PI / 180);

arr.map(Math.sin);

arr.map(function(e){return Math.sin(e).toFixed(2);});

```

map.html:
```
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'/>
  <title>Minions</title>
</head>
<body id='body'>
  <h1>小小兵</h1>
  <script>
    var body = document.getElementById('body');
    var images_array = ['01.jpg', 'minions.jpg', '02.jpg', '03.jpg'];
    var showImage = function(el){
      var img = document.createElement('img');
      img.src = './img/' + el;
      body.appendChild(img);
    };

    images_array.map(showImage);
  </script>
</body>
</html>
```
