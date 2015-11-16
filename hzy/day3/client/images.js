var React = require('react');

var Images = React.createClass({
  render: function(){
//    var dir = this.props.dir;
    return (
      <div class='thumbnail'>
        {this.props.imgs.map(function(i){
           return(
              <img src={this.dir + i} />
             );
        },this.props)}
      </div>
      );
  }
});
module.exports = Images;
