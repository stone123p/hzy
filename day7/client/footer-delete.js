var React = require('react');

var Footer = React.createClass({
  handleDelete: function(e){              // <--- 刪除留言的事件處理函式
    e.preventDefault();
    if(confirm("確定要刪除這筆留言?")){
      this.props.onDeleteMessage(this.props.message.id);
    }
  },
  render: function(){
    return (
      <div className='panel-footer'>
        <div className='container-fluid'>
          <span className='pull-right'>
            <button type='button' className='btn btn-default'>
              <span className='glyphicon glyphicon-pencil'></span>修改
            </button>
            <button type='button' className='btn btn-default'
              onClick={this.handleDelete}>  {/* onClick指定事件處理函式*/}
              <span className='glyphicon glyphicon-remove'></span>刪除
            </button>
          </span>
        </div>
      </div>
    );
  }
});

module.exports = Footer;
