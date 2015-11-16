var React = require('react');
var Heading = require('./heading.js');
var Content = require('./content.js');
var Footer = require('./footer.js');

var Message = React.createClass({
  render: function(){
    return (
      <div className="panel panel-default">
        <Heading message={this.props.message} />
        <Content message={this.props.message} />
        <Footer message={this.props.message} />
      </div>
    );
  }
});

module.exports = Message;
