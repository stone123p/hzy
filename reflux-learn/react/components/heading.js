var React = require('react');

var Heading = React.createClass({
  render: function(){
    return (
      <div className="panel-heading">
        <span>
          {this.props.message.author}
        </span>
        <span className='pull-right'>
          發表於：{this.props.message.created_at}
        </span>
      </div>
    );
  }
});

module.exports = Heading;
