var Dispatcher = require('CrowdDispatcher');
var WORKER_CONST = require('./WorkerConst');
var EXPERIMENT_CONST = require('../Experiment/ExperimentConst');

var WORKER_EVENTS = {
  CHANGE: 'worker_change'
};

// WorkerStore
var Events = require('events');
var WorkerStore = new Events.EventEmitter();

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

WorkerStore.dispatcherIndex = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case WORKER_CONST.GET:
      WorkerStore._setWorker(action.worker);
      break;
    case WORKER_CONST.UPDATE:
      WorkerStore._setWorker(action.worker);
      break;
    case EXPERIMENT_CONST.REGISTER:
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

module.exports = WorkerStore;
