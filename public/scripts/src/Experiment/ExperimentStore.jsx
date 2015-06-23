'use strict';

if (typeof require !== 'undefined') {
  var CrowdDispatcher = require('CrowdDispatcher');
  var ExperimentConst = require('./ExperimentConst');
  var Events = require('events');
  var ExperimentStore = new Events.EventEmitter();
} else {
  ExperimentStore = {
    _callbacks: [],
    on: function (event, callback) {
      ExperimentStore._callbacks.push(callback);
    },
    emit: function () {
      ExperimentStore._callbacks.forEach(function (callback) {
        callback();
      });
    },
    removeEventListener: function () {

    }
  };

}

var EXPERIMENT_EVENTS = {
  CHANGE: 'experiment_change'
};

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
ExperimentStore.dispatcherIndex = CrowdDispatcher.register(function(action) {
  switch(action.actionType) {
    case ExperimentConst.REGISTER:
      this._setExperiment(action.experiment);
      break;
    case ExperimentConst.UPDATE:
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

if (typeof module !== 'undefined') {
  module.exports = ExperimentStore;
}
