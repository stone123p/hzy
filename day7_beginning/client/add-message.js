var React = require('react');

var AddMessage = React.createClass({
  render: function(){
    return (
      <div className='container-fluid'>
        <h3>新增留言</h3>
        <form>
          <input className="form-control" type="text" placeholder="你的名字" />
          <input className="form-control" type="text" placeholder="留言的訊息" />
          <span className='pull-right'>
            <input type='Submit' value='留言' className='btn btn-default' />
          </span>
        </form>
        <br/>
      </div>
    );
  }
});

module.exports = AddMessage;
