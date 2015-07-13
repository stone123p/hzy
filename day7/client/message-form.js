var React = require('react');

var MessageForm = React.createClass({
  handleSubmit: function(e){              //<--- 處理送出表單的事件處理函式
    e.preventDefault();
    
    // 取得表單中的 author 和 content 欄位的值
    var author_node = React.findDOMNode(this.refs.author);
    var content_node = React.findDOMNode(this.refs.content);
    var author = author_node.value.trim();
    var content = content_node.value.trim();
    if(!content || !author){
      return;
    }
   
    // 把這個元件的 message 物件，複製到新的變數 message
    var message = {};
    Object.keys(this.props.message).forEach(function(key){
      message[key] = this.props.message[key];
      console.log(this.props.message[key]);
    }.bind(this));

    message.author = author;
    message.content = content;


    this.props.onUpdateMessage(message);     //<--- 交由父元件處理
    this.props.onHideForm(e);                //<--- 送出表單後隱藏表單
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
              onClick={this.props.onHideForm} />
              {/* 點取消按鈕後，由父元件，隱藏此表單 */}
          </span>
        </form>
        <br/>
      </div>
    );
  }
});

module.exports = MessageForm;
