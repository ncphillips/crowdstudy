'use strict';
/**
 * Nolan Phillips 2015
 *
 * Based heavily off of the Facebook Flux Dispatcher.
 * Pretty much just removes the dependency on `invariant`.
 * Seriously, all that module did was make throwing errors slightly nicer. Completely unnecessary.
 */

var _prefix = 'ID_';

/**
 * _Dispatcher
 * @constructor
 */
var _Dispatcher = function () {

  this._lastID = 0;
  this._callbacks = {};
  this._isPending = {};
  this._isHandled = {};
  this._isDispatching = false;
  this._pendingPayload = null;

};

/**
 * Registers a callback to be invoked with every dispatched payload. Returns
 * a token that can be used with `waitFor()`.
 *
 * @param {function} callback
 * @return {string}
 */
_Dispatcher.prototype.register = function (callback) {
  var id = _prefix + this._lastID++;
  this._callbacks[id] = callback;
  return id;
};

/**
 * Removes a callback based on its token.
 *
 * @param {string} id
 */
_Dispatcher.prototype.unregister = function (id) {
  if (!this._callbacks[id]) {
    throw new Error('_Dispatcher.unregister(...): `', id, '` does not map to a registered callback.');
  }
  delete this._callbacks[id];
};

/**
 * Waits for the callbacks specified to be invoked before continuing execution
 * of the current callback. This method should only be used by a callback in
 * response to a dispatched payload.
 *
 * @param {array<string>} ids
 */
_Dispatcher.prototype.waitFor = function (ids) {
  if (!this._isDispatching) {
    throw new Error('_Dispatcher.waitFor(...): Must be invoked while dispatching.');
  }
  for (var ii = 0; ii < ids.length; ii++) {
    var id = ids[ii];
    if (this._isPending[id]) {
      if (!this._isHandled[id]) {
        throw  new Error('_Dispatcher.waitFor(...): Circular dependency detected while waiting for `', id, '`.');
      }
      continue;
    }
    if (!this._callbacks[id]) {
      throw new Error('_Dispatcher.waitFor(...): `', id, '` does not map to a registered callback.');
    }
    this._invokeCallback(id);
  }
};


/**
 * Dispatches a payload to all registered callbacks.
 *
 * @param {object} payload
 */
_Dispatcher.prototype.dispatch = function (payload, tries) {
  if (this._isDispatching) {
    tries = (tries || 0) + 1;
    if (tries < 15) {
      setTimeout(this.dispatch.bind(this, payload, tries), 100);
    }
    else {
      throw new Error('Dispatch.dispatch(...): Blocked from dispatching.');
    }
  }
  this._startDispatching(payload);
  try {
    for (var id in this._callbacks) {
      if (this._isPending[id]) {
        continue;
      }
      this._invokeCallback(id);
    }
  } finally {
    this._stopDispatching();
  }
};


/**
 * Is this _Dispatcher currently dispatching.
 *
 * @return {boolean}
 */
_Dispatcher.prototype.isDispatching = function () {
  return this._isDispatching;
};


/**
 * Call the callback stored with the given id. Also do some internal
 * bookkeeping.
 *
 * @param {string} id
 * @internal
 */
_Dispatcher.prototype._invokeCallback = function (id) {
  this._isPending[id] = true;
  this._callbacks[id](this._pendingPayload);
  this._isHandled[id] = true;
};


/**
 * Set up bookkeeping needed when dispatching.
 *
 * @param {object} payload
 * @internal
 */
_Dispatcher.prototype._startDispatching = function (payload) {
  for (var id in this._callbacks) {
    this._isPending[id] = false;
    this._isHandled[id] = false;
  }
  this._pendingPayload = payload;
  this._isDispatching = true;
};


/**
 * Clear bookkeeping used for dispatching.
 *
 * @internal
 */
_Dispatcher.prototype._stopDispatching = function () {
  this._pendingPayload = null;
  this._isDispatching = false;
};

var Dispatcher = new _Dispatcher();
