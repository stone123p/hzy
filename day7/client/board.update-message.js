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
