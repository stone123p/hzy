var React = require('react');

var SearchBar = React.createClass({
  render: function(){
    return (
      <div className='container-fluid'>
        <input className="form-control" 
          type="text" placeholder="搜尋..." 
        />
        <br/>
      </div>
    );
  }
});

module.exports = SearchBar;
