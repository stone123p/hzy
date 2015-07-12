var React = require('react');
//var Board = require('./board.js');
var Board = require('./board.state.js');    //<--- 改為有state的board.js

React.render(
  <Board />,
  document.getElementById('app')
);
