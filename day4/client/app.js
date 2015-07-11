var React = require('react');
var List = require('./list.js');
React.render(
    <List json='/mylinks' />,
    document.getElementById('app')
);
