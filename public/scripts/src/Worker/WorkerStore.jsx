'use strict';

if (typeof require !== 'undefined') {
  var CrowdDispatcher = require('CrowdDispatcher');
  var WorkerConst = require('./WorkerConst');
  var Events = require('events');
  var WorkerStore = new Events.EventEmitter();
} else {
  WorkerStore = {
    _callbacks: [],
    on: function (event, callback) {
      WorkerStore._callbacks.push(callback);
    },
    emit: function () {
      WorkerStore._callbacks.forEach(function (callback) {
        callback();
      });
    },
    removeEventListener: function () {

    }
  };

}

var WORKER_EVENTS = {
  CHANGE: 'worker_change'
};

WorkerStore._worker = null;

WorkerStore.emitChange = function () {
  this.emit(WORKER_EVENTS.CHANGE);
}.bind(WorkerStore);

WorkerStore.addChangeListener = function(callback) {
  this.on(WORKER_EVENTS.CHANGE, callback);
};

WorkerStore.removeChangeListener = function(callback) {
  this.removeListener(WORKER_EVENTS.CHANGE, callback);
};

WorkerStore.dispatcherIndex = CrowdDispatcher.register(function(action) {
  switch(action.actionType) {
    case WorkerConst.GET:
      WorkerStore._setWorker(action.worker);
      break;
    case WorkerConst.UPDATE:
      WorkerStore._setWorker(action.worker);
      break;
    case ExperimentConst.REGISTER:
      WorkerStore._worker.experiments[action.experiment_name] = action.experiment;
      break;
  }
});


/**
 *
 * @param worker
 */
WorkerStore._setWorker = function (worker) {
  WorkerStore._worker = worker;
  WorkerStore.emitChange();
};


/**
 * Returns the currently loaded Worker.
 * @returns {null|*}
 */
WorkerStore.get = function () {
  return WorkerStore._worker;
};

if (typeof module !== 'undefined') {
  module.exports = WorkerStore;
}
