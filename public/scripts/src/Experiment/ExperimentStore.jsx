var Dispatcher = require('CrowdDispatcher');
var EXPERIMENT_CONST = require('./ExperimentConst');

var EXPERIMENT_EVENTS = {
  CHANGE: 'experiment_change'
};

var Events = require('events');
var ExperimentStore = new Events.EventEmitter();

ExperimentStore._experiment = null;

// Event Stuff
ExperimentStore.emitChange = function () {
  ExperimentStore.emit(EXPERIMENT_EVENTS.CHANGE);
};

ExperimentStore.addChangeListener = function(callback) {
  ExperimentStore.on(EXPERIMENT_EVENTS.CHANGE, callback);
};

ExperimentStore.removeChangeListener = function(callback) {
  ExperimentStore.removeListener(EXPERIMENT_EVENTS.CHANGE, callback);
};

// Action Listener
ExperimentStore.dispatcherIndex = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case EXPERIMENT_CONST.REGISTER:
      this._setExperiment(action.experiment);
      break;
    case EXPERIMENT_CONST.UPDATE:
      this._setExperiment(action.experiment);
      break;

  }
}.bind(ExperimentStore));


// Action Responders
ExperimentStore._setExperiment= function (experiment) {
  ExperimentStore._experiment = experiment;
  ExperimentStore.emitChange();
};


// Queries
ExperimentStore.get = function () {
  return ExperimentStore._experiment;
};

module.exports = ExperimentStore;
