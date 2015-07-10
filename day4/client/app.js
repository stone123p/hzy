var React = require('react');
var Images = require('./images.js');
React.render(
    <Images json='/cars' />,
    document.getElementById('app')
);
