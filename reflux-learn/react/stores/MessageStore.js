var Reflux = require('reflux');

var MessageActions = require('../actions/MessageActions');

var _messages = mockupData;


var MessageStore = Reflux.createStore({
  init: function(){
    this.listenTo(MessageActions.search, this.onSearch);
    this.listenTo(MessageActions.create, this.onCreate);
    this.listenTo(MessageActions.delete, this.onDelete);
    this.listenTo(MessageActions.update, this.onUpdate);
  },
  searchContent: function(str){
    return function(message){
      return message.content.search(str) > -1;
    }
  },
  idToIndex: function(id){
    return function(m){
      return m.id === id;
    }
  },
  onUpdate: function(message){
    var index = _messages.findIndex(this.idToIndex(message.id));
    console.log(index);
    _messages[index].author = message.author;
    _messages[index].content = message.content;
    this.trigger(_messages);
  },
  
  onDelete: function(message){
    var index = _messages.findIndex(this.idToIndex(message.id));
    _messages.splice(index, 1);
    this.trigger(_messages);
  },

  onCreate: function(message){
    message.id = new_id++;
    message.created_at = Date();
    _messages.push(message);
    this.trigger(_messages);
  },
  onSearch: function(str){
    this.trigger(_messages.filter(this.searchContent(str)));
  },

  getMessages: function(){
    return _messages;
  }
});

module.exports = MessageStore;
