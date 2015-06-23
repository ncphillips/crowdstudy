'use strict';
if (typeof require !== 'undefined') {
  var CrowdDispatcher = require('CrowdDispatcher');
  var WorkerConst = require('./WorkerConst');
}

var WorkerActions = {
  get_or_create: function (worker) {
    $.ajax({
      url: '/worker',
      type: 'POST',
      dataType: 'json',
      data: worker,
      success: _worker_get_action,
      error: _worker_error_action
    });
  },

  get_by_id: function (_id) {
    var url = '/worker/' + _id;
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: _worker_get_action,
      error: _worker_error_action
    });
  },

  update: function (_id, worker) {
    var url = '/worker/' + _id;
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: worker,
      success: _worker_update_action,
      error: _worker_error_action
    });
  }
};

function _worker_get_action(worker) {
  if (worker instanceof Array) {
    worker = worker[0];
  }

  var action = {
    actionType: WorkerConst.GET,
    worker: worker
  };

  CrowdDispatcher.dispatch(action)
}

function _worker_update_action(worker) {
  var action = {
    actionType: WorkerConst.UPDATE,
    worker: worker
  };
  CrowdDispatcher.dispatch(action)
}

function _worker_error_action(xhr, status, err) {
  var action = {
    actionType: 'worker_error',
    xhr: xhr,
    status: status,
    error: err
  };

  CrowdDispatcher.dispatch(action);
}

if (typeof module !== 'undefined') {
  module.exports = WorkerActions;
}