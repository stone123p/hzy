var React = require('react');
var MessageActions = require('../actions/MessageActions');

var AddMessage = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var author_node = React.findDOMNode(this.refs.author);
    var content_node = React.findDOMNode(this.refs.content);
    var message = {};
    message.author = author_node.value.trim();
    message.content = content_node.value.trim();
    if(!message.author || !message.content){
      return;
    }
    author_node.value = content_node.value = '';
    MessageActions.create(message);
  },
  render: function(){
    return (
      <div className='container-fluid'>
        <h3>新增留言</h3>
        <form onSubmit={this.handleSubmit}>
          <input ref='author' className="form-control" type="text" placeholder="你的名字" />
          <input ref='content' className="form-control" type="text" placeholder="留言的訊息" />
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
