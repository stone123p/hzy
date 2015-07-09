var React = require('react');
var Images = require('./images.js');
var imgs = ['01.jpg', 'minions.jpg', '03.jpg', '02.jpg'];
React.render(
    <Images imgs={imgs} dir='./img/' />,
    document.getElementById('app')
);
