var React = require('react');
var Message = require('./message.js');
var AddMessage = require('./add-message.js'); //<--- 加入新增留言的元件檔
var SearchBar = require('./search-bar.js');   //<--- 加入搜尋的元件檔
var MessageStore = require('../stores/MessageStore');

var Board = React.createClass({
  getInitialState: function(){
    return {messages: MessageStore.getMessages()};  
  },

  componentDidMount: function(){
    this.unsubscribe = MessageStore.listen(this.onChange);
  },
  componentWillUnmount: function(){
    this.unsubscribe();
  },
  
  onChange: function(messages){
    this.setState({messages: messages});
  },
  render: function(){
    return (
      <div className='board'>
        <h2>留言板</h2>
        <SearchBar />
        {this.state.messages.map(function(m){
           return <Message message={m} />
        })}
        <AddMessage />
      </div>
    );
  }
});

module.exports = Board;
