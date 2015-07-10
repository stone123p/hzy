var React = require('react');

var Images = React.createClass({
  render: function(){
//    var dir = this.props.dir;           // <--- 註解掉 dir 的變數宣告。
    return (
      <div class='thumbnail'>
        {this.props.imgs.map(function(i){
           return(                        // <--- 這裏的this 透過指定第二
                                          // 個參數。變成props。所以我們用
                                          // this.dir 便可以取得外面的
                                          // this.props.dir 的值。
              <img src={this.dir + i} />  
             );
        },this.props)}                    // <--- map()的第二個參數，可以
                                          // 指定函式內的this，轉換context
                                          // this 的 context 情境經過轉換
                                          // this 變成這個元件的 this.props
      </div>
      );
  }
});
module.exports = Images;
