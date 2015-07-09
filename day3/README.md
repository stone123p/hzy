# Day3
------
##React.js

###index.html
```
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'/>
  <title>React JS</title>
  <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' rel='stylesheet' type='text/css'/>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>
</head>
<body>
  <h1>React JS</h1>
  <div id='file_list'/>
  <script src='./js/mylinks.js'></script>
</body>
</html>
```
------
### js/mylinks.js
```
var files = ['3_01.html'];
var files_div = document.getElementById('file_list');
var ordered_list = document.createElement('ol');
files_div.appendChild(ordered_list);
files.map(function(f){
  var list = document.createElement('li');
  var anchor = document.createElement('a');
  anchor.href = './' + f;
  anchor.innerHTML = f;
  list.appendChild(anchor);
  ordered_list.appendChild(list);
});
```
### 3_01.html
```
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'/>
  <title>React JS 3_01</title>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js'></script>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js'></script>
</head>
<body>
  <a href='./index.html'>&lt;&lt;返回</a>
  <!-- 這是html 的註解，瀏覽器不顯示  -->
  <div id='app'/> <!-- React.js 的掛載點-->
  <!-- 下面這段是 react 的 jsx，今天的學習重點 -->
  <script type='text/jsx'>
    React.render(
      <h1>Hello, there!</h1>,
      document.getElementById('app')
    );
  </script>
</body>
</html>
```
