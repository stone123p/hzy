var React = require('react');

var Content = React.createClass({
  render: function(){
    return (
      <div className="panel-body">
        {this.props.message.content}
      </div>
    );
  }
});

module.exports = Content;
