var React = require('react');
//var Board = require('./board.js');
//var Board = require('./board.state.js');
//var Board = require('./board.add-and-search.js');
var Board = require('./board.search-event.js');
//var Board = require('./board.add-message.js');
//var Board = require('./board.delete-message.js');
//var Board = require('./board.update-message.js');//<--- 改為編輯留言功能的檔案

React.render(
  <Board />,
  document.getElementById('app')
);
