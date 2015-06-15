var Dispatcher = require('CrowdDispatcher');
var ExperimentConst = require('./ExperimentConst');

var ExperimentActions = {
  register: function (worker_id, experiment_name) {
    var url = '/worker/' + worker_id + '/experiments/' + experiment_name;
    console.log(url);
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: _experiment_register_action.bind(null, experiment_name),
      error: _experiment_error_action
    });
  },

  update: function (worker_id, experiment_name, experiment) {
    var url = '/worker/' + worker_id + '/experiments/' + experiment_name;
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: experiment,
      success: _experiment_update_action.bind(null, experiment_name),
      error: _experiment_error_action
    });
  },

  markComplete: function (worker_id, experiment_name) {
    var url = '/worker/' + worker_id + '/experiments/' + experiment_name + '/mark_complete';
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: _experiment_update_action.bind(null, experiment_name),
      error: _experiment_error_action
    });
  }
};

function _experiment_error_action(xhr, status, err) {
  var action = {
    actionType: ExperimentConst.ERROR,
    xhr: xhr,
    status: status,
    error: err
  };

  Dispatcher.dispatch(action);
}

function _experiment_register_action(name, experiment) {
  console.log("ExperimentActions._experiment_register_action: " + experiment);
  var action = {
    actionType: ExperimentConst.REGISTER,
    experiment: experiment,
    experiment_name: name
  };

  Dispatcher.dispatch(action);
}

function _experiment_update_action(name, experiment) {
  console.log("ExperimentActions._experiment_update_action: " + name + experiment);
  var action = {
    actionType: ExperimentConst.UPDATE,
    experiment: experiment,
    experiment_name: name
  };

  Dispatcher.dispatch(action);
}

module.exports = ExperimentActions;