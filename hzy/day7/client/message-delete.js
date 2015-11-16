var React = require('react');
var Heading = require('./heading.js');
var Content = require('./content.js');
var Footer = require('./footer-delete.js');   //<-- 含括有刪除功能的檔案

var Message = React.createClass({
  render: function(){
    return (
      <div className="panel panel-default">
        <Heading message={this.props.message} />
        <Content message={this.props.message} />
        <Footer message={this.props.message} 
          onDeleteMessage={this.props.onDeleteMessage}/> 
          {/*指定事件處理函式: 直接把父元件的函式轉定義給子元件*/}
      </div>
    );
  }
});

module.exports = Message;
