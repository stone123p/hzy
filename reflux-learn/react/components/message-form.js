var React = require('react');
var MessageActions = require('../actions/MessageActions');

var MessageForm = React.createClass({
  handleSubmit: function(e){
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
    }.bind(this));

    message.author = author;
    message.content = content;
    MessageActions.update(message);
    this.props.onHide(e);               
  },
  render: function(){
    return (
      <div className='container-fluid'>
        <form onSubmit={this.handleSubmit}> {/* 指定表單送出的事件處理函式*/}
          <input ref="author" className="form-control" type="text" 
            defaultValue={this.props.message.author}
            placeholder="你的名字" /> {/* 加入 ref */}
          <input ref="content" className="form-control" type="text" 
            defaultValue={this.props.message.content}
            placeholder="留言的訊息" /> {/* 加入 ref */}
          <span className='pull-right'>
            <input type='Submit' value='更新' className='btn btn-default' />
            <input type='Reset' value='取消' className='btn btn-default' 
              onClick={this.props.onHide} />
          </span>
        </form>
        <br/>
      </div>
    );
  }
});

module.exports = MessageForm;
