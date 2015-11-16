var React = require('react');

var Images = React.createClass({
  getInitialState: function(){
    console.log('getInitialState');
    return {imgs: []}
  },
  componentDidMount: function(){
    console.log('componentDidMount');
    $.ajax({
      url: this.props.json,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log('get data');
        this.setState({imgs: data});
      }.bind(this), 
      error: function(xhr, status, err){
        console.error(this.props.json, status, err.toString());
      }.bind(this) 
    });
  },
  render: function(){
    return (
      <div class='thumbnail'>
        {this.state.imgs.map(function(i){
           return(
              <img src={i} />
             );
        })}
      </div>
      );
  }
});
module.exports = Images;
