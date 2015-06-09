var Dispatcher = {
  _callbacks: []
};

/**
 * Register a Store's callback so that it may be invoked by an action.
 *
 * @param {function} callback The callback to be registered.
 * @returns {number} The index of the new callback.
 */
Dispatcher.register = function (callback) {
  this._callbacks.push(callback);
  return this._callbacks.length - 1;
};

/**
 * dispatch
 * @param {object} payload The data from the action.
 */
Dispatcher.dispatch = function (payload) {
  this._callbacks.forEach(function (callback, i) {
    console.log("callback ", i);
    callback(payload);
  });
};

Dispatcher.handleViewAction = function (action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = Dispatcher;