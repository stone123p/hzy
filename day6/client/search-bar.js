var React = require('react');

var SearchBar = React.createClass({
  render: function(){
    return (
      <div className='container-fluid'>
        <form>
          <input className="form-control" type="text" placeholder="搜尋..." />
          <br/>
        </form>
      </div>
    );
  }
});

module.exports = SearchBar;
