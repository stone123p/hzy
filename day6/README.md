# Day 6
------
#專案工作項目
```
1. 用戶端瀏覽器的UI(使用者介面)
   1.1 留言板資料的呈現。
   1.2 留言板的新增，更新，刪除等操作介面。
   1.3 上面操作介面的事件處理函式。
   1.4 頁面資料的更新。
   
2. 伺服器端的API(應用程式開發介面)
   2.1 資料庫Schema 的定義
   2.2 伺服器端 API 的路徑指定
   2.3 對應API路徑的處理函式

3. 瀏覽器與伺服器之間資料交換
   3.1 採用json格式。
```
------
##前後端程式設計師的合作：決定資料交換規格與方式。
1. 留言板的每一則訊息格式為json物件。其欄位如下：
```
{
  "id": "some id",                    // 訊息編號
  "content": "This is a message",     // 訊息本文
  "author": "Somebody",               // 作者
  "created_at": "Date Time String"    // po 文時間
}
```
2. 後端程式設計師，按RESTful的方式，開發 web api 供前端應用程式存取後端的服務。RESTful的觀念，在之後會解釋。

在開發初期，雙方決定好上面兩件事情之後，便可以開始進行各自的開發工作。

# 前端程式設計師
##1. 設計 Mockup(草稿)
在這個階段中，我們只是先按照客戶的構想，先設計出一個草稿，用這個草稿和客戶或主管溝通，確定這是符合他們需要。所有功能，口述即可，完全不用撰寫任何程式。
這個草稿只是提供一個比較具體的視覺化呈現，讓雙方討論起來會比較有依據。

產生 mockup.html
```
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'/>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>留言板 Mockup</title>
  <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' rel='stylesheet' type='text/css'/>
  <link href='./css/nav.css' rel='stylesheet' type='text/css'/>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>
</head>
<body>
  <div class="container">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button class="navbar-toggle collapsed" 
            type="button" 
            aria-expanded='false'
            aria-controls='navbar'
            data-toggle="collapse"
            data-target="#navbar-main">
            <span class='sr-only'>Toggle navigation</span>
            <span class='icon-bar'></span>
            <span class='icon-bar'></span>
            <span class='icon-bar'></span>
          </button>
          <a class="navbar-brand" href='#'>留言板</a>
        </div>
        <div class="navbar-collapse collapse" id="navbar">
          <ul class="nav navbar-nav">
            <li><a href='#'>連結1</a></li>
            <li><a href='#'>連結2</a></li>
            <li><a href='#'>連結3</a></li>
            <li><a href='#'>連結4</a></li>
          </ul>
        </div><!--/.navbar-collapse -->
      </div><!--/.container-fluid -->
    </nav>
    <div class="jumbotron">
      <h2>留言板</h2>
      <div class="panel panel-default">
        <div class="panel-heading">
          <span>
            一頁書
          </span>
          <span class='pull-right'>
            發表於：Sat Jul 11 2015 22:44:59
          </span>
        </div><!-- panel-heading -->
        <div class="panel-body">
          世事如棋，乾坤莫測，笑盡英雄啊～～～～
        </div><!-- panel-body -->
        <div class='panel-footer'>
          <div class='container-fluid'>
            <span class='pull-right'>
              <button type='button' class='btn btn-default'>
                <span class='glyphicon glyphicon-pencil'></span>修改
              </button>
              <button type='button' class='btn btn-default'>
                <span class='glyphicon glyphicon-remove'></span>刪除
              </button>
            </span>
          </div>
        </div><!-- /panel-footer -->
      </div><!-- /panel -->
      <div class="panel panel-default">
        <div class="panel-heading">
          <span>
            素還真
          </span>
          <span class='pull-right'>
            發表於：Sat Jul 11 2015 22:46:59
          </span>
        </div><!-- panel-heading -->
        <div class="panel-body">
          笨神笨聖亦笨仙，犬儒犬道嗜犬賢。
        </div><!-- panel-body -->
        <div class='panel-footer'>
          <div class='container-fluid'>
            <span class='pull-right'>
              <button type='button' class='btn btn-default'>
                <span class='glyphicon glyphicon-pencil'></span>修改
              </button>
              <button type='button' class='btn btn-default'>
                <span class='glyphicon glyphicon-remove'></span>刪除
              </button>
            </span>
          </div>
        </div><!-- /panel-footer -->
      </div><!-- /panel -->
      <div class="panel panel-default">
        <div class="panel-heading">
          <span>
            葉小釵
          </span>
          <span class='pull-right'>
            發表於：Sat Jul 11 2015 22:48:33
          </span>
        </div><!-- panel-heading -->
        <div class="panel-body">
          啊～～～～
          啊～～～～
          啊～～～～
        </div><!-- panel-body -->
        <div class='panel-footer'>
          <div class='container-fluid'>
            <span class='pull-right'>
              <button type='button' class='btn btn-default'>
                <span class='glyphicon glyphicon-pencil'></span>修改
              </button>
              <button type='button' class='btn btn-default'>
                <span class='glyphicon glyphicon-remove'></span>刪除
              </button>
            </span>
          </div>
        </div><!-- /panel-footer -->
      </div><!-- /panel -->
    </div> <!-- /jumbotron -->
  </div><!-- /container -->
</body>
</html>
```
##2. 按照溝通修改過後的mockup，分析其DOM結構，改寫成react.js 元件。
###2.1 mockup 結構分析
仔細觀察 mockup.html 頁面。可以看出有一個留言板的分區，裡面有三則留言，每一則留言以 Bootstrap 的 panel 排版。Panel Heading 有作者姓名，和發表時間。Panel Body 是留言的本文。Panel Footer 則有修改和刪除這兩個按鈕。結構圖繪製如下：
```
Board
  |-- Message
         |-- Heading
         |-- Content
         |-- Footer
```
###2.2 檔案結構圖: 根據上面的結構圖，我們需要撰寫的html及 React.js檔案及之間的結構關係，繪製如下：
```
index.html
  |-- app.js
       |-- board.js
              |-- message.js
                    |-- heading.js
                    |-- content.js
                    |-- footer.js 
```
###2.3 撰寫檔案(靜態: 只用到this.props) 及 mockup data。
為了能完整呈現與 mockup.html 草稿相符的畫面，同時檢驗我們的程式檔，能正確解析並呈現資料。我們要按照之前與後端程式設計師所決定好的資料交換格式，建立一組測試資料。我們在 index.html 中，宣告一個全域變數 mockupData ，以陣列存放這組測試資料。mockup 資料寫在 index.html 的好處是，資料如果需要修改，無需重新編譯我們的程式碼。在開發的初期過程中，mockup 資料只是暫時過渡的測試資料，在後面的階段，將會改寫成從後端資料庫取回的資料。
##*注意：在 react.js 中的 jsx 元件的 class 必須改為 className*
index.html
```
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'/>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>留言板</title>
  <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' rel='stylesheet' type='text/css'/>
  <link href='./css/nav.css' rel='stylesheet' type='text/css'/>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>
</head>
<body>
  <div class="container">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button class="navbar-toggle collapsed" 
            type="button" 
            aria-expanded='false'
            aria-controls='navbar'
            data-toggle="collapse"
            data-target="#navbar-main">
            <span class='sr-only'>Toggle navigation</span>
            <span class='icon-bar'></span>
            <span class='icon-bar'></span>
            <span class='icon-bar'></span>
          </button>
          <a class="navbar-brand" href='#'>留言板</a>
        </div>
        <div class="navbar-collapse collapse" id="navbar">
          <ul class="nav navbar-nav">
            <li><a href='#'>連結1</a></li>
            <li><a href='#'>連結2</a></li>
            <li><a href='#'>連結3</a></li>
            <li><a href='#'>連結4</a></li>
          </ul>
        </div><!--/.navbar-collapse -->
      </div><!--/.container-fluid -->
    </nav>
    <div class="jumbotron" id='app'>
    </div> <!-- /jumbotron -->
    <script>
      var mockupData = [
        {"id": "1", "author": "一頁書", "content": "世事如棋，乾坤莫測，笑盡英雄啊～～～～", "created_at": "Sat Jul 11 2015 22:44:59"},
        {"id": "2", "author": "素還真", "content": "笨神笨聖亦笨仙，犬儒犬道嗜犬賢。", "created_at": "Sat Jul 11 2015 22:46:59"},
        {"id": "3", "author": "葉小釵", "content": "啊～～～～啊～～～～啊～～～～", "created_at": "Sat Jul 11 2015 22:48:33"}
      ];
    </script>
    <script src='./js/app.bundle.js'></script>
  </div><!-- /container -->
</body>
</html>
```
------
app.js
```
var React = require('react');
var Board = require('./board.js');

React.render(
  <Board />,
  document.getElementById('app')
);
```
------
board.js
```
var React = require('react');
var Message = require('./message.js');

var Board = React.createClass({
  render: function(){
    return (
      <div className='board'>
        <h2>留言板</h2>
        {mockupData.map(function(m){
           return <Message message={m} />
        })}
      </div>
    );
  }
});

module.exports = Board;
```
------
message.js
```
var React = require('react');
var Heading = require('./heading.js');
var Content = require('./content.js');
var Footer = require('./footer.js');

var Message = React.createClass({
  render: function(){
    return (
      <div className="panel panel-default">
        <Heading message={this.props.message} />
        <Content message={this.props.message} />
        <Footer message={this.props.message} />
      </div>
    );
  }
});

module.exports = Message;
```
------
heading.js
```
var React = require('react');

var Heading = React.createClass({
  render: function(){
    return (
      <div className="panel-heading">
        <span>
          {this.props.message.author}
        </span>
        <span className='pull-right'>
          發表於：{this.props.message.created_at}
        </span>
      </div>
    );
  }
});

module.exports = Heading;
```
------
content.js
```
var React = require('react');

var Content = React.createClass({
  render: function(){
    return (
      <div className="panel-body">
        {this.props.message.content}
      </div>
    );
  }
});

module.exports = Content;
```
------
footer.js
```
var React = require('react');

var Footer = React.createClass({
  render: function(){
    return (
      <div className='panel-footer'>
        <div className='container-fluid'>
          <span className='pull-right'>
            <button type='button' className='btn btn-default'>
              <span className='glyphicon glyphicon-pencil'></span>修改
            </button>
            <button type='button' className='btn btn-default'>
              <span className='glyphicon glyphicon-remove'></span>刪除
            </button>
          </span>
        </div>
      </div>
    );
  }
});

module.exports = Footer;
```
------
###2.4 因為使用者可以對資料做新增，更新，刪除等操作，所以，資料必須是動態而且可能會變更的。在 React.js 會變更的資料，在最上層的元件中，以State的方式存在，所以，我們必須修改 board.js，加入元件的State，並且把 mockupData 載入到 state。檔案及之間的結構關係，繪製如下：
```
index.html
  |-- app.js                          //<--- 修改 require 的 board 檔
       |-- board.state.js             //<--- 修改過的 board 檔
              |-- message.js
                    |-- heading.js
                    |-- content.js
                    |-- footer.js 
```
------
app.js
```
var React = require('react');
//var Board = require('./board.js');
var Board = require('./board.state.js');    //<--- 改為有state的board.js

React.render(
  <Board />,
  document.getElementById('app')
);
```
------
board.state.js
```
var React = require('react');
var Message = require('./message.js');

var Board = React.createClass({
  getInitialState: function(){              //<--- 初始化元件的 state
    return {messages: []};                  //留言資料為 state 的 messages
  },

  componentDidMount: function(){            //<--- 元件掛載後，
    this.setState({messages: mockupData});  //載入mockupData到 messages陣列
  },

  render: function(){
    return (
      <div className='board'>
        <h2>留言板</h2>
        {this.state.messages.map(function(m){
           return <Message message={m} />
        })}
      </div>
    );
  }
});

module.exports = Board;
```
------
##3. 留言板的新增，更新，刪除等操作介面。
在這個工作階段中，再重新檢視之前的規劃，發覺少了一個新增留言的表單，所以，必須增加一個元件提供新增留言的表單。另外，客戶提出一個新的需求，希望可以查詢留言內容，所以，又多增加了一個元件來查詢留言。
###3.1 檔案結構圖：
```
index.html
  |-- app.js                          //<--- 修改 require 的 board 檔
       |-- board.add-and-search.js    //<--- 修改過的 board 檔
              |-- add-message.js      //<--- 新增留言的表單
              |-- search-bar.js       //<--- 查詢留言
              |-- message.js
                    |-- heading.js
                    |-- content.js
                    |-- footer.js 
```
------
app.js
```
var React = require('react');
//var Board = require('./board.js');
//var Board = require('./board.state.js');
var Board = require('./board.add-and-search.js');//<--- 改為有新增與查詢的board.js

React.render(
  <Board />,
  document.getElementById('app')
);
```
------
board.add-and-search.js
```
var React = require('react');
var Message = require('./message.js');
var AddMessage = require('./add-message.js'); //<--- 加入新增留言的元件檔
var SearchBar = require('./search-bar.js');   //<--- 加入搜尋的元件檔

var Board = React.createClass({
  getInitialState: function(){
    return {messages: []};
  },

  componentDidMount: function(){            
    this.setState({messages: mockupData});  
  },

  render: function(){
    return (
      <div className='board'>
        <h2>留言板</h2>
        <SearchBar />                           //<--- 搜尋介面的元件
        {this.state.messages.map(function(m){
           return <Message message={m} />
        })}
        <AddMessage />                          //<--- 新增留言介面的元件
      </div>
    );
  }
});

module.exports = Board;
```
------
add-message.js
```
var React = require('react');

var AddMessage = React.createClass({
  render: function(){
    return (
      <div className='container-fluid'>
        <h3>新增留言</h3>
        <form>
          <input className="form-control" type="text" placeholder="你的名字" />
          <input className="form-control" type="text" placeholder="留言的訊息" />
          <span className='pull-right'>
            <button type='button' className='btn btn-default'>
              <span className='glyphicon glyphicon-plus'></span>留言
            </button>
          </span>
        </form>
        <br/>
      </div>
    );
  }
});

module.exports = AddMessage;
```
------
search-bar.js
```
var React = require('react');

var SearchBar = React.createClass({
  render: function(){
    return (
      <div className='container-fluid'>
        <form>
          <input className="form-control" type="text" placeholder="搜尋..." />
          <br/>
        </form>
      </div>
    );
  }
});

module.exports = SearchBar;
```
# 後端程式設計師





　
