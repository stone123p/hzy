var React = require('react');

var MessageForm = React.createClass({
  handleSubmit: function(e){              //<--- 處理送出表單的事件處理函式
    e.preventDefault();
    var author_node = React.findDOMNode(this.refs.author);
    var content_node = React.findDOMNode(this.refs.content);
    var author = author_node.value.trim();
    var content = content_node.value.trim();
    if(!content || !author){
      return;
    }
    
    var message = {};
    Object.keys(this.props.message).forEach(function(key){
      message[key] = this.props.message[key];
      console.log(this.props.message[key]);
    }.bind(this));
    //var message = this.props.message;
    message.author = author;
    message.content = content;
    this.props.onUpdateMessage(message);
    this.props.onHideForm(e);
  },
  render: function(){
    return (
      <div className='container-fluid'>
        <form onSubmit={this.handleSubmit}>
          <input ref="author" className="form-control" type="text" 
            defaultValue={this.props.message.author}
            placeholder="你的名字" /> {/* 加入 ref */}
          <input ref="content" className="form-control" type="text" 
            defaultValue={this.props.message.content}
            placeholder="留言的訊息" /> {/* 加入 ref */}
          <span className='pull-right'>
            <input type='Submit' value='更新' className='btn btn-default' />
            <input type='Reset' value='取消' className='btn btn-default' onClick={this.props.onHideForm} />
          </span>
        </form>
        <br/>
      </div>
    );
  }
});

module.exports = MessageForm;
