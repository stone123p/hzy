var React = require('react');

var Images = React.createClass({
  render: function(){
    var dir = this.props.dir;             // <--- 宣告dir 變數，函式內的所有                                          // 程式碼皆可存取此一變數。
    return (
      <div class='thumbnail'>
        {this.props.imgs.map(function(i){
           return(                        // <--- 內崁的函式，可以存取外部函
                                          // 式的變數。
                                          // 這種方式：稱之為閉包。Closure
              <img src={dir + i} />  
             );
        })}
      </div>
      );
  }
});
module.exports = Images;
