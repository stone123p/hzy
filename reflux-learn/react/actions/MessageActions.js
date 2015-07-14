var Reflux = require('reflux');

var MessageActions = Reflux.createActions([
    'search',
    'create',
    'delete',
    'update'
]);

module.exports = MessageActions;
