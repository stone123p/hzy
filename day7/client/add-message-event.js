var React = require('react');

var AddMessage = React.createClass({
  handleSubmit: function(e){              //<--- 處理送出表單的事件處理函式
    e.preventDefault();
    var author_node = React.findDOMNode(this.refs.author);
    var content_node = React.findDOMNode(this.refs.content);
    var author = author_node.value.trim();
    var content = content_node.value.trim();
    if(!content || !author){
      return;
    }
    author_node.value = content_node.value = '';
    this.props.onAdd(author, content);  // 呼叫上一層的元件來加入新留言

  },
  render: function(){
    return (
      <div className='container-fluid'>
        <h3>新增留言</h3>
        <form onSubmit={this.handleSubmit}>
          <input ref="author" className="form-control" type="text" placeholder="你的名字" /> {/* 加入 ref */}
          <input ref="content" className="form-control" type="text" placeholder="留言的訊息" /> {/* 加入 ref */}
          <span className='pull-right'>
            <input type='Submit' value='留言' className='btn btn-default' />
          </span>
        </form>
        <br/>
      </div>
    );
  }
});

module.exports = AddMessage;
