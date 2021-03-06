# Day 7
------
#專案工作項目
```
1. 用戶端瀏覽器的UI(使用者介面)
   1.1 留言板資料的呈現。
   1.2 留言板的新增，更新，刪除等操作介面。
   1.3 上面操作介面的事件處理函式。           <--- 今天從這開始
   1.4 頁面資料的更新。
   
2. 伺服器端的API(應用程式開發介面)
   2.1 資料庫Schema 的定義
   2.2 伺服器端 API 的路徑指定
   2.3 對應API路徑的處理函式

3. 瀏覽器與伺服器之間資料交換
   3.1 採用json格式。
```
------
## 4. 操作介面的事件處理函式與畫面的更新
在這個工作階段，定義操作介面的事件處理函式，以處理使用者操作時所引發的事件，並且更新畫面中的資料。我們先從最簡單的 Search Bar 開始，因為，這個搜尋只需在瀏覽器端搜尋即可，無需到伺服器取得資料。

## *JavaScript 搜尋陣列的方法---使用陣列的filter方法*
陣列的 filter() 方法，可以讓你定義一個函式作為參數。執行 filter()方法時，會把陣列的元素當成參數，丟給你定義的函式處理。在你定義的函式，必須傳回 true 或 false 值。然後 filter()方法，會傳回一個陣列。這個陣列只包含你定義函式傳回true值的元素。
在瀏覽器的 console 玩一玩。
```
[1, 2, 3, 4, 5, 6, 7].filter(function(e) {return e % 2 === 0;});
```
------
在這個專案的搜尋稍微複雜一點。因為，在搜尋時，必須提供使用者輸入的搜尋文字。而在上面的瀏覽器例子中，只有運算式，函式並提供額外的參數供我們做比較。要解決這個問題，就必須使用到在函式內在定義函式的技巧。外圍的函示接受參數，內部的函式，則以陣列的元素作參數。因為，內部的函式可以存取外圍函式所有的變數(包括外圍函式的參數)。這樣，內部的函式就可以針對外圍的參數與陣列的元素作比較，傳回true 或 false值。

打開 index.html。在瀏覽器的 console 玩一玩。
```
var searchByContent = function(str){
  return function(message){
    return message.content.search(str) > -1;
  }
};

mockupData.filter(searchByContent("啊"));

```
------
### 4.1 搜尋的事件處理函式與畫面更新
事件處理函式架構圖：
```


鄉民輸入搜尋文字  --->  SearchBar ---> Board
                          |             |-- 在 render SearchBar標籤時，
                          |                 定義 onSearchChange={this.handleSearchChange}
                          |                 SearchBar可透過this.props.onSearchChange
                          |                 將搜尋的工作丟給 Board 處理。
                          |                 因為，Board 有 state 可以更新
                          |                 畫面
                          |
                          |-- onChange 擷取文字變化的事件
                              定義SearchBar時，要定義對應
                              的事件處理函式:
                              onChange={this.handleChange}
                              但是，SearchBar沒有 messages
                              messages 是存在於 Board。
                              所以，必須傳給 Board處理

```

### 檔案結構圖：
```
index.html
  |-- app.js                          //<--- 修改 require 的 board 檔
       |-- board.search-event.js      //<--- 加入事件處理函式
              |-- add-message.js      
              |-- search-bar-event.js //<--- 加入事件處理函式
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
//var Board = require('./board.add-and-search.js');
var Board = require('./board.search-event.js');//<--- 改為有search event檔案

React.render(
  <Board />,
  document.getElementById('app')
);
```
------
board.search-event.js
```
var React = require('react');
var Message = require('./message.js');
var AddMessage = require('./add-message.js'); //<--- 加入新增留言的元件檔
var SearchBar = require('./search-bar-event.js');   //<--- 加入搜尋的元件檔

var searchByContent = function(str){
  return function(message){
    return message.content.search(str) > -1;
  }
};

var Board = React.createClass({
  handleSearchChange: function(str){
    this.setState({
      messages: mockupData.filter(searchByContent(str))
    });
  },
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
        <SearchBar onSearchChange={this.handleSearchChange}/>                 {/*<--- 搜尋介面的元件*/}
        {this.state.messages.map(function(m){
           return <Message message={m} />
        })}
        <AddMessage />                          {/*<--- 新增留言介面的元件*/}
      </div>
    );
  }
});

module.exports = Board;
```
------
search-bar-event.js
```
var React = require('react');

var SearchBar = React.createClass({
  handleChange: function(e){
    this.props.onSearchChange(e.target.value);
  },
  render: function(){
    return (
      <div className='container-fluid'>
        <input className="form-control" 
          type="text" placeholder="搜尋..." 
          onChange={this.handleChange}
        />
        <br/>
      </div>
    );
  }
});

module.exports = SearchBar;
```
------
### 4.2 新增留言的事件處理函式與畫面更新

### 檔案結構圖：
```
index.html                            // 加入全域變數 new_id
  |-- app.js                          //<--- 修改 require 的 board 檔
       |-- board.add-message.js       //<--- 加入新增留言事件處理函式
              |-- add-message-event.js      //<--- 加入新增留言事件處理函式
              |-- search-bar-event.js 
              |-- message.js
                    |-- heading.js
                    |-- content.js
                    |-- footer.js 
```
------
index.html 部分程式碼：
```
    <script>
      var new_id = 4;    //<--- new_id 全域變數，新增留言遞增以產生獨特的編號
      var mockupData = [
        {"id": "1", "author": "三頁書", "content": "世事如棋，乾坤莫測，笑盡英雄啊～～～～", "created_at": "Sat Jul 11 2015 22:44:59"},
        {"id": "2", "author": "素還真", "content": "笨神笨聖亦笨仙，犬儒犬道嗜犬賢。", "created_at": "Sat Jul 11 2015 22:46:59"},
        {"id": "3", "author": "葉小釵", "content": "啊～～～～啊～～～～啊～～～～", "created_at": "Sat Jul 11 2015 22:48:33"}
      ];
    </script>
```
------
app.js
```
var React = require('react');
//var Board = require('./board.js');
//var Board = require('./board.state.js');
//var Board = require('./board.add-and-search.js');
//var Board = require('./board.search-event.js');//<--- 改為有search event檔案
var Board = require('./board.add-message.js');//<--- 改為有新增留言功能的檔案

React.render(
  <Board />,
  document.getElementById('app')
);
```
------
board.add-message.js
```
var React = require('react');
var Message = require('./message.js');
var AddMessage = require('./add-message-event.js');   //<--- 加入事件處理函式
var SearchBar = require('./search-bar-event.js'); 

var searchByContent = function(str){
  return function(message){
    return message.content.search(str) > -1;
  }
};

var Board = React.createClass({
  addMessage: function(author, content){    //<-- 加入新留言
    var new_message = {
      "id": new_id,
      "author": author,
      "content": content,
      "created_at": Date()
    };
    new_id++;                               // 遞增留言的編號
    mockupData.unshift(new_message);        // 使用unshift新增元素至陣列的前端
    this.setState({messages: mockupData});  // 更新State
  },
  handleSearchChange: function(str){
    this.setState({
      messages: mockupData.filter(searchByContent(str))
    });
  },
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
        <SearchBar onSearchChange={this.handleSearchChange}/>                           {/*<--- 搜尋介面的元件*/}
        {this.state.messages.map(function(m){
           return <Message message={m} />
        })}
        <AddMessage onAdd={this.addMessage}/>        {/*<--- 指定事件處理函式*/}
      </div>
    );
  }
});

module.exports = Board;
```
------
add-message-event.js
```
var React = require('react');

var AddMessage = React.createClass({
  handleSubmit: function(e){              //<--- 處理送出表單的事件處理函式
    e.preventDefault();
    var author_node = React.findDOMNode(this.refs.author);
    var content_node = React.findDOMNode(this.refs.content);
    var author = author_node.value.trim();
    var content = content_node.value.trim();
    if(!content || !author){
      return;
    }
    author_node.value = content_node.value = '';
    this.props.onAdd(author, content);  // 呼叫上一層的元件來加入新留言

  },
  render: function(){
    return (
      <div className='container-fluid'>
        <h3>新增留言</h3>
        <form onSubmit={this.handleSubmit}>
          <input ref="author" className="form-control" type="text" placeholder="你的名字" /> {/* 加入 ref */}
          <input ref="content" className="form-control" type="text" placeholder="留言的訊息" /> {/* 加入 ref */}
          <span className='pull-right'>
            <input type='Submit' value='留言' className='btn btn-default' />
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
### 4.3 刪除留言的事件處理函式與畫面更新

### 檔案結構圖：
```
index.html                            
  |-- app.js                          //<--- 修改 require 的 board 檔
       |-- board.delete-message.js    //<--- 加入刪除留言事件處理函式
              |-- add-message-event.js      
              |-- search-bar-event.js 
              |-- message-delete.js   //<--- 加入刪除留言事件處理函式
                    |-- heading.js
                    |-- content.js
                    |-- footer-delete.js //<--- 加入刪除留言事件處理函式
```
------
app.js
```
var React = require('react');
//var Board = require('./board.js');
//var Board = require('./board.state.js');
//var Board = require('./board.add-and-search.js');
//var Board = require('./board.search-event.js');
//var Board = require('./board.add-message.js');
var Board = require('./board.delete-message.js');//<--- 改為刪除留言功能的檔案

React.render(
  <Board />,
  document.getElementById('app')
);
```
------
board.delete-message.js
```
var React = require('react');
var Message = require('./message-delete.js');  //<--- 加入刪除事件處理函式
var AddMessage = require('./add-message-event.js');   
var SearchBar = require('./search-bar-event.js'); 

var searchByContent = function(str){
  return function(message){
    return message.content.search(str) > -1;
  }
};
var getIndexWithId = function(id){   //<--- 按照訊息編號找出該訊息的陣列索引
  return function(e){
    return e.id === id;
  };
};

var Board = React.createClass({
  deleteMessage: function(id){      //<-- 刪除留言
    var index = mockupData.findIndex(getIndexWithId(id));
    mockupData.splice(index, 1);
    this.setState({messages: mockupData});  // 更新State
  },
  addMessage: function(author, content){    
    var new_message = {
      "id": new_id,
      "author": author,
      "content": content,
      "created_at": Date()
    };
    new_id++;                               
    mockupData.unshift(new_message);        
    this.setState({messages: mockupData});  
  },
  handleSearchChange: function(str){
    this.setState({
      messages: mockupData.filter(searchByContent(str))
    });
  },
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
        <SearchBar onSearchChange={this.handleSearchChange}/>                           {/*<--- 搜尋介面的元件*/}
        {this.state.messages.map(function(m){
           return <Message 
                    onDeleteMessage={this.deleteMessage} 
                    message={m} 
                  />
        }.bind(this))}
        {/*<--- 超重要：這裡一定要 bind(this)，why??? */}
        <AddMessage onAdd={this.addMessage}/>        
      </div>
    );
  }
});

module.exports = Board;
```
------
message-delete.js
```
var React = require('react');
var Heading = require('./heading.js');
var Content = require('./content.js');
var Footer = require('./footer-delete.js');   //<-- 含括有刪除功能的檔案

var Message = React.createClass({
  render: function(){
    return (
      <div className="panel panel-default">
        <Heading message={this.props.message} />
        <Content message={this.props.message} />
        <Footer message={this.props.message} 
          onDeleteMessage={this.props.onDeleteMessage}/> 
          {/*指定事件處理函式: 直接把父元件的函式轉定義給子元件*/}
      </div>
    );
  }
});

module.exports = Message;
```
------
footer-delete.js
```
var React = require('react');

var Footer = React.createClass({
  handleDelete: function(e){              // <--- 刪除留言的事件處理函式
    e.preventDefault();
    if(confirm("確定要刪除這筆留言?")){
      this.props.onDeleteMessage(this.props.message.id);
    }
  },
  render: function(){
    return (
      <div className='panel-footer'>
        <div className='container-fluid'>
          <span className='pull-right'>
            <button type='button' className='btn btn-default'>
              <span className='glyphicon glyphicon-pencil'></span>修改
            </button>
            <button type='button' className='btn btn-default'
              onClick={this.handleDelete}>  {/* onClick指定事件處理函式*/}
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
### 4.4 更新留言的事件處理函式與畫面更新

### 檔案結構圖：
```
index.html                            
  |-- app.js                          //<--- 修改 require 的 board 檔
       |-- board.update-message.js    //<--- 加入更新留言事件處理函式
              |-- add-message-event.js      
              |-- search-bar-event.js 
              |-- message-update.js   //<--- 加入更新留言事件處理函式
                    |-- heading.js
                    |-- content.js
                    |-- footer-update.js //<--- 加入更新留言事件處理函式
                    |-- message-form.js  //<--- 更新留言的表單元件
```
------
app.js
```
var React = require('react');
//var Board = require('./board.js');
//var Board = require('./board.state.js');
//var Board = require('./board.add-and-search.js');
//var Board = require('./board.search-event.js');
//var Board = require('./board.add-message.js');
//var Board = require('./board.delete-message.js');
var Board = require('./board.update-message.js');//<--- 改為更新留言功能的檔案

React.render(
  <Board />,
  document.getElementById('app')
);
```
------
board.update-message.js
```
var React = require('react');
var Message = require('./message-update.js');  //<--- 加入編輯事件處理函式
var AddMessage = require('./add-message-event.js');   
var SearchBar = require('./search-bar-event.js'); 

var searchByContent = function(str){
  return function(message){
    return message.content.search(str) > -1;
  }
};
var getIndexWithId = function(id){ 
  return function(e){
    return e.id === id;
  };
};

var Board = React.createClass({
  updateMessage: function(message){  //<-- 更新留言
    var index = mockupData.findIndex(getIndexWithId(message.id));
    mockupData[index] = message;
    this.setState({messages: mockupData}); // 更新State
  },
  deleteMessage: function(id){      
    var index = mockupData.findIndex(getIndexWithId(id));
    mockupData.splice(index, 1);
    this.setState({messages: mockupData});  
  },
  addMessage: function(author, content){    
    var new_message = {
      "id": new_id,
      "author": author,
      "content": content,
      "created_at": Date()
    };
    new_id++;                               
    mockupData.unshift(new_message);        
    this.setState({messages: mockupData});  
  },
  handleSearchChange: function(str){
    this.setState({
      messages: mockupData.filter(searchByContent(str))
    });
  },
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
        <SearchBar onSearchChange={this.handleSearchChange}/>
        {this.state.messages.map(function(m){
           return <Message 
                    onDeleteMessage={this.deleteMessage} 
                    message={m} 
                    onUpdateMessage={this.updateMessage}  
                  />
        }.bind(this))}
        <AddMessage onAdd={this.addMessage}/>        
      </div>
    );
  }
});

module.exports = Board;
```
------
message-update.js
```
var React = require('react');
var Heading = require('./heading.js');
var Content = require('./content.js');
var Footer = require('./footer-update.js');     //<--- 更新按鈕事件處理
var MessageForm = require('./message-form.js');

var Message = React.createClass({
  showEditForm: function(e){  //<-- 顯示表單
    e.preventDefault();
    this.setState({isEditing: true});
  },
  hideForm: function(e){    //<-- 隱藏表單
    e.preventDefault();
    this.setState({isEditing: false});
  },
  handleDelete: function(e){
    e.preventDefault();
    if(confirm("確定要刪除這筆留言?")){
      this.props.onDeleteMessage(this.props.message.id);
    }
  },
  getInitialState: function(){  //<--這裏，我們需要 state 儲存表單切換狀態
    return {isEditing: false};
  },
  render: function(){
    if(this.state.isEditing){  // 按照 isEditing 值，決定輸出表單或留言
      return(
        <div className="panel panel-primary">
          <div className="panel-body">
            <MessageForm 
              message={this.props.message}
              onUpdateMessage = {this.props.onUpdateMessage} 
              onHideForm={this.hideForm} /> {/* 指定隱藏表單功能給子物件*/}
          </div>
        </div>
      );
    }else{
      return (
        <div className="panel panel-default">
          <Heading message={this.props.message} />
          <Content message={this.props.message} />
          <Footer message={this.props.message} 
            onUpdateMessage={this.showEditForm} 
            onDeleteMessage={this.handleDelete}/>
        </div>
      );
    }
  }
});

module.exports = Message;
```
------
footer-update.js
```
var React = require('react');

var Footer = React.createClass({
  render: function(){
    return (
      <div className='panel-footer'>
        <div className='container-fluid'>
          <span className='pull-right'>
            <button type='button' className='btn btn-default'
              onClick={this.props.onUpdateMessage}>{/*<--指定事件處理函式*/}
              <span className='glyphicon glyphicon-pencil'></span>修改
            </button>
            <button type='button' className='btn btn-default'
              onClick={this.props.onDeleteMessage}>
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
message-form.js
```
var React = require('react');

var MessageForm = React.createClass({
  handleSubmit: function(e){              //<--- 處理送出表單的事件處理函式
    e.preventDefault();
    
    // 取得表單中的 author 和 content 欄位的值
    var author_node = React.findDOMNode(this.refs.author);
    var content_node = React.findDOMNode(this.refs.content);
    var author = author_node.value.trim();
    var content = content_node.value.trim();
    if(!content || !author){
      return;
    }
   
    // 把這個元件的 message 物件，複製到新的變數 message
    var message = {};
    Object.keys(this.props.message).forEach(function(key){
      message[key] = this.props.message[key];
      console.log(this.props.message[key]);
    }.bind(this));

    message.author = author;
    message.content = content;


    this.props.onUpdateMessage(message);     //<--- 交由父元件處理
    this.props.onHideForm(e);                //<--- 送出表單後隱藏表單
  },
  render: function(){
    return (
      <div className='container-fluid'>
        <form onSubmit={this.handleSubmit}> {/* 指定表單送出的事件處理函式*/}
          <input ref="author" className="form-control" type="text" 
            defaultValue={this.props.message.author}
            placeholder="你的名字" /> {/* 加入 ref */}
          <input ref="content" className="form-control" type="text" 
            defaultValue={this.props.message.content}
            placeholder="留言的訊息" /> {/* 加入 ref */}
          <span className='pull-right'>
            <input type='Submit' value='更新' className='btn btn-default' />
            <input type='Reset' value='取消' className='btn btn-default' 
              onClick={this.props.onHideForm} />
              {/* 點取消按鈕後，由父元件，隱藏此表單 */}
          </span>
        </form>
        <br/>
      </div>
    );
  }
});

module.exports = MessageForm;
```

　
