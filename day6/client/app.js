var React = require('react');
//var Board = require('./board.js');
//var Board = require('./board.state.js');
//var Board = require('./board.add-and-search.js');
var Board = require('./board.search-event.js');//<--- 改為有search event檔案

React.render(
  <Board />,
  document.getElementById('app')
);
