'use strict';

var CrowdDispatcher = null;

if (typeof require !== 'undefined'){
  var Dispatcher =  require('flux').Dispatcher;
  CrowdDispatcher = new Dispatcher();
} else {

  CrowdDispatcher = {
    _callbacks: {},
    _lastId: 1,

    register: function (callback) {
      var id = CrowdDispatcher._lastId + 1;
      CrowdDispatcher._lastId = id;
      CrowdDispatcher._callbacks[id] = callback;
      return id;
    },

    dispatch: function (action) {
      var ids = Object.getOwnPropertyNames(CrowdDispatcher._callbacks);
      ids.forEach(function (id) {
        CrowdDispatcher._callbacks[id](action);
      });
    },
    unregister: function (id) {
      delete this._callbacks[id];
    }
  };
}

if (typeof module !== 'undefined') {
  module.exports = CrowdDispatcher;
}
