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
            <button type='button' className='btn btn-default'>
              <span className='glyphicon glyphicon-plus'></span>留言
            </button>
          </span>
        </form>
        <br/>
      </div>
    );
  }
});

module.exports = AddMessage;
