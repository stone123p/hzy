var React = require('react');

var Images = React.createClass({
  render: function(){
//    var dir = this.props.dir;           // <--- 註解掉 dir 的變數宣告。
    return (
      <div class='thumbnail'>
        {this.props.imgs.map(function(i){
           return(                        // <--- 這裏的this 透過bind
                                          // 綁定。變成props。所以我們用
                                          // this.dir 便可以取得外面的
                                          // this.props.dir 的值。
              <img src={this.dir + i} />
             );
        }.bind(this.props))}              // <--- 使用bind 綁定，把函式外
                                          // 面的this.props，綁進來，成為
                                          // 函式內的this
      </div>
      );
  }
});
module.exports = Images;
