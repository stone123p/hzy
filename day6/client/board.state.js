var React = require('react');
var Message = require('./message.js');

var Board = React.createClass({
  getInitialState: function(){              //<--- 初始化元件的 state
    return {messages: []};                  //留言的資料為 state 的 message
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
