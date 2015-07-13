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
  cancelUpdate: function(e){
    e.preventDefault();
    this.setState({isEditing: false});
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
              cancelUpdate={this.cancelUpdate} />
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
            onDeleteMessage={this.props.onDeleteMessage}/>
        </div>
      );
    }
  }
});

module.exports = Message;
