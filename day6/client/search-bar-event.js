var React = require('react');

var SearchBar = React.createClass({
  handleChange: function(e){
    this.props.onSearchChange(e.target.value);
  },
  render: function(){
    return (
      <div className='container-fluid'>
        <form>
          <input className="form-control" 
            type="text" placeholder="搜尋..." 
            onChange={this.handleChange}
          />
          <br/>
        </form>
      </div>
    );
  }
});

module.exports = SearchBar;
