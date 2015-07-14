var React = require('react');
var MessageActions = require('../actions/MessageActions');

var Footer = React.createClass({
  handleDelete: function(e){
    e.preventDefault();
    if(confirm('確定刪除這筆留言？')){
      MessageActions.delete(this.props.message);
    }
  },
  render: function(){
    return (
      <div className='panel-footer'>
        <div className='container-fluid'>
          <span className='pull-right'>
            <button 
              onClick={this.props.onEdit}
              type='button' className='btn btn-default'>
              <span className='glyphicon glyphicon-pencil'></span>修改
            </button>
            <button type='button' className='btn btn-default' onClick={this.handleDelete}>
              <span className='glyphicon glyphicon-remove'></span>刪除
            </button>
          </span>
        </div>
      </div>
    );
  }
});

module.exports = Footer;
