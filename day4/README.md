# Day4
------
#Javascript 觀念複習：Closure, Context, bind()
##問題：
在內崁函式的this，到底指的是誰？
內崁函式可以存取外部函式的變數。但是，每個函式都有自我。每個函式都有this。內崁函式如何存取外部函式的this變數。
我們在 images.js 裡面就碰到這個問題。我們使用了陣列map()函式，建構多個img元件。map()函式必須要使用函式當作它的參數，在這個函示中，逐一處理陣列中的每個元素。但是，當我們必須存取React元件的屬性this.props時，就碰到了，如何解決this 衝突的問題。
##解決方式
1. Closure
2. Context
3. bind()
一. Closure
Closure閉包：內崁函式，可以存取外部函式所宣告的變數。所以，碰到this的衝突時
只要在外部函式宣告並指定this給一個變數即可，內崁函式即可存取這個變數。
###用法：
```
function outer(){
  var outer_var = this;
  arr.map(function(){// just use outer_var...return something});
}
```
### client/images-closure.js
```
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
```
二. Context
Context 執行情境。陣列的map()函式，可以在第二個參數指定執行情境給第一個參數的函式，把第二個參數當成函式的this。
###用法：
```
function outer(){
  arr.map(function(){}, give_me_a_context);
}
// 在上面的第一個參數函式裡面，this = give_me_a_context
```
client/images-context.js
```
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
```
三. bind()
bind()函式綁定。透過函式綁定，可以指定一個參數作為函式的this。
###用法：
```
function outer(){
  arr.map(function(){}.bind(something));
}
// 在上面的參數函式裡面，this = something
```
client/images-bind.js
```
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
```
#為什麼要在函式內再定義函式，或是用函式當作另一個函式的參數。這樣不是很煩嗎？
## Javascript non-blocking
[![ScreenShot](https://raw.github.com/GabLeRoux/WebMole/master/ressources/WebMole_Youtube_Video.png)](https://youtu.be/gPeN8uo6bG8)

###Javascript 是 non-blocking(不可阻擋我的路)的程式語言。傳統的程式語言，通常是逐一執行，碰到存取網路，硬碟之類有關io輸出入的運算時，會等到取得運算結果後，才會再執行下一行程式碼。
```
傳統程式語言：
a = giveMeSomethingFromSever();
// 等到上面的函式執行完畢，傳回結果後，再繼續執行下一行。
println("I am happy to get a: " + a);
```
Non-Blocking 程式語言: 碰到比較慢的運算時，如：io輸出入處理函式。程式會在這些函式中允許你另外定義Callback回呼函式，當作參數。等到 io 輸出入處理函式，執行完畢之後，就會執行你的Callback回呼函式。這樣可以讓程式可以繼續處理其他的工作，不用耗在那裡等待。我先處理其他事情，有事再Call 我。
```
Non-Blocking 程式語言：
giveMeSometingFromServer(function(){println("I get a on call!");});
doSomethingElseImmediately();
```
