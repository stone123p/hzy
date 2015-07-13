var React = require('react');
var Message = require('./message.js');
var AddMessage = require('./add-message.js'); //<--- 加入新增留言的元件檔
var SearchBar = require('./search-bar.js');   //<--- 加入搜尋的元件檔

var searchByContent = function(str){
  return function(message){
    return message.content.search(str) > -1;
  }
};

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
        <SearchBar />                           {/*<--- 搜尋介面的元件*/}
        {this.state.messages.map(function(m){
           return <Message message={m} />
        })}
        <AddMessage />                          {/*<--- 新增留言介面的元件*/}
      </div>
    );
  }
});

module.exports = Board;
