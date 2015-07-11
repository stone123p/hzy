var React = require('react');
var Message = require('./message.js');

var mockupData = [
  {"id": "1", "author": "一頁書", "content": "世事如棋，乾坤莫測，笑盡英雄啊～～～～", "created_at": "Sat Jul 11 2015 22:44:59"},
  {"id": "2", "author": "素還真", "content": "笨神笨聖亦笨仙，犬儒犬道嗜犬賢。", "created_at": "Sat Jul 11 2015 22:46:59"},
  {"id": "3", "author": "葉小釵", "content": "啊～～～～啊～～～～啊～～～～", "created_at": "Sat Jul 11 2015 22:48:33"}
];
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
