var React = require('react');
//var Board = require('./board.js');
//var Board = require('./board.state.js');  
var Board = require('./board.add-and-search.js');//<--- 改為有新增與查詢的board.js
React.render(
  <Board />,
  document.getElementById('app')
);
