var Dispatcher = require('CrowdDispatcher');
WORKER_URLS = {
  REGISTER: '/worker/register'
};
var WORKER_CONST = {
  REGISTER: 'worker_register',
  UPDATE: 'worker_update'
};
var WORKER_EVENTS = {
  CHANGE: 'worker_change'
};

// WorkerStore
var WorkerStore = require('events').EventEmitter;

WorkerStore.emitChange = function () {
  this.emit(WORKER_CHANGE);
}.bind(WorkerStore);

WorkerStore.addChangeListener = function(callback) {
  this.on(CHANGE_EVENT, callback);
};

WorkerStore.removeChangeListener = function(callback) {
  this.removeListener(CHANGE_EVENT, callback);
};

WorkerStore.dispatcherIndex = Dispatcher.register(function(payload) {
  var action = payload.action;

  var id;
  var platform;
  var experiment;

  switch(action.actionType) {
    case WORKER_CONST.REGISTER:
      id = payload.id;
      platform = payload.platform;
      experiment = payload.experiment;
      WorkerStore.register(id, platform, experiment);

      break;
  }
});

WorkerStore.update = function (_id, worker) {
  $.ajax({
    url: WORKER_URLS.REGISTER,
    type: 'POST',
    dataType: 'json',
    data: {
      worker: {
        id: id,
        platform: platform
      },
      experiment_name: experiment
    },
    success: WorkerStore.emitChange,
    error: function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });

};

WorkerStore.register = function (id, platform, experiment) {
  $.ajax({
    url: WORKER_URLS.REGISTER,
    type: 'POST',
    dataType: 'json',
    data: {
      worker: {
        id: id,
        platform: platform
      },
      experiment_name: experiment
    },
    success: WorkerStore.emitChange,
    error: function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
};

module.exports.URLS = WORKER_URLS;
module.exports.CONST = WORKER_CONST;
module.exports.EVENTS = WORKER_EVENTS;
module.exports.Store = WorkerStore;
