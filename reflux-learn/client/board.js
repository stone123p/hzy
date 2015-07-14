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
