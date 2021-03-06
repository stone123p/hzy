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
