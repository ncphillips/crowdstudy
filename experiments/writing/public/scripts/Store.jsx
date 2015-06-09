var EventEmitter = require('events').EventEmitter;

var WritingStore = new EventEmitter();

WritingStore.emitChange = function () {
  return this.emit(CHANGE_EVENT);
};

WritingStore.addChangeListener = function (callback) {
  this.on(CHANGE_EVENT, callback);
  return _todos;
};

WritingStore.removeChangeListener = function (callback) {
  this.remove(CHANGE_EVENT, callback);
};

WritingStore.dispatcherIndex = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

  }
  return true;
});

WritingStore.create = function (text) {

};

WritingStore.destroy = function (id) {
};

module.exports = WritingStore;
