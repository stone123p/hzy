var React = require('react');
var List = require('./list.js');
React.render(
    <List json='/link.json' />,
    document.getElementById('app')
);
