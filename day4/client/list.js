var React = require('react');

var List = React.createClass({
  getInitialState: function(){
    console.log('getInitialState');
    return {list: []}
  },
  componentDidMount: function(){
    console.log('componentDidMount');
    $.ajax({
      url: this.props.json,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log('get data');
        this.setState({list: data});
      }.bind(this), 
      error: function(xhr, status, err){
        console.error(this.props.json, status, err.toString());
      }.bind(this) 
    });
  },
  render: function(){
    return (
      <div class='thumbnail'>
      <ol>
        {this.state.list.map(function(i){
           return(
             <li><a href={i}>{i}</a></li>
             );
        })}
      </ol>
      </div>
      );
  }
});
module.exports = List;
