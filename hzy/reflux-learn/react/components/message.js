var React = require('react');
var Heading = require('./heading.js');
var Content = require('./content.js');
var Footer = require('./footer.js');
var MessageForm = require('./message-form.js');

var Message = React.createClass({
  showForm: function(e){
    e.preventDefault();
    this.setState({isEditing: true});
  }, 
  hideForm: function(e){
    e.preventDefault();
    this.setState({isEditing: false});
  }, 
  getInitialState: function(){
    return {isEditing: false};
  },
  render: function(){
    if(this.state.isEditing){
      return (
        <div className="panel panel-primary panel-form">
          <MessageForm message={this.props.message}
            onHide={this.hideForm} />
        </div>
      );
    }else{
      return (
        <div className="panel panel-default">
          <Heading message={this.props.message} />
          <Content message={this.props.message} />
          <Footer message={this.props.message} onEdit={this.showForm} />
        </div>
      );
    }
  }
});

module.exports = Message;
