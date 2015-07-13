var React = require('react');
var Heading = require('./heading.js');
var Content = require('./content.js');
var Footer = require('./footer-update.js');     //<--- 更新按鈕事件處理
var MessageForm = require('./message-form.js');

var Message = React.createClass({
  showEditForm: function(e){
    e.preventDefault();
    this.setState({isEditing: true});
  },
  hideForm: function(e){
    e.preventDefault();
    this.setState({isEditing: false});
  },
  handleDelete: function(e){
    e.preventDefault();
    if(confirm("確定要刪除這筆留言?")){
      this.props.onDeleteMessage(this.props.message.id);
    }
  },
  getInitialState: function(){
    return {isEditing: false};
  },
  render: function(){
    if(this.state.isEditing){
      return(
        <div className="panel panel-primary">
          <div className="panel-body">
            <MessageForm 
              message={this.props.message}
              onUpdateMessage = {this.props.onUpdateMessage} 
              onHideForm={this.hideForm} />
          </div>
        </div>
      );
    }else{
      return (
        <div className="panel panel-default">
          <Heading message={this.props.message} />
          <Content message={this.props.message} />
          <Footer message={this.props.message} 
            onUpdateMessage={this.showEditForm}
            onDeleteMessage={this.handleDelete}/>
        </div>
      );
    }
  }
});

module.exports = Message;
