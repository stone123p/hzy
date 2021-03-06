var React = require('react');

var SearchBar = React.createClass({
  handleChange: function(e){
    e.preventDefault();
    this.props.onSearchChange(e.target.value);
  },
  render: function(){
    return (
      <div className='container-fluid'>
        <input className="form-control" 
          type="text" placeholder="搜尋..." 
          onChange={this.handleChange}
        />
        <br/>
      </div>
    );
  }
});

module.exports = SearchBar;
