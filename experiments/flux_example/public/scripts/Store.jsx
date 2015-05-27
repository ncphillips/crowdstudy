'use strict';

var Dispatcher = require('./Dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var Store = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit
  }
});

