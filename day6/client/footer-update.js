var React = require('react');

var Footer = React.createClass({
  render: function(){
    return (
      <div className='panel-footer'>
        <div className='container-fluid'>
          <span className='pull-right'>
            <button type='button' className='btn btn-default'
              onClick={this.props.onUpdateMessage}>
              <span className='glyphicon glyphicon-pencil'></span>修改
            </button>
            <button type='button' className='btn btn-default'
              onClick={this.props.onDeleteMessage}>
              <span className='glyphicon glyphicon-remove'></span>刪除
            </button>
          </span>
        </div>
      </div>
    );
  }
});

module.exports = Footer;
