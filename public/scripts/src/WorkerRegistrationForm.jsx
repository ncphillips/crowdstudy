'use strict';
if (typeof require !== 'undefined') {
  var WorkerActions = require('WorkerActions');
}
/**
 * This React component renders a page for capturing a crowd worker's id and platform.
 *
 *
 * @example
 *
 * var MyApp = {
 *   workerRegistered: function (updated_state) {
 *      this.setState(updated_state);
 *   },
 *   render: function () {
 *      return (
 *        <WorkerRegistrationForm callback={this.workerRegistered}>
 *            Here is some additional information pertaining to this experiment.
 *        </WorkerRegistrationForm>
 *      );
 *   }
 * }
 */
var WorkerRegistrationForm = React.createClass({
  render: function () {
    return (
      <div id="worker-id-form">
        <div id="worker-id-form-additional-instructions">
          <h1 className="text-center">UPEI HCI Lab </h1>
          <p> We are studying crowd work. </p>
          <p> Before starting, please tell us what platform you are coming from, and what you're worker ID is. </p>
        </div>
        <div className="form-group">
          <label htmlFor="worker-platform">Platform</label>
          <select id="worker-platform" className="form-control">
            <option value="crowdflower">CrowdFlower</option>
            <option value="mturk">Amazaon Mechanical Turk</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="worker_id">Worker ID</label>
          <input type="text" id="worker-id" name="worker-id" className="form-control"/>
        </div>
        <div className="form-group">
          <input type="button" id="worker-id-button"
            className="btn btn-primary form-control"
            value="Submit" onClick={this.submitForm}/>
        </div>
      </div>
    );
  },

  submitForm: function () {
    var worker = {
      id: document.getElementById('worker-id').value,
      platform: document.getElementById('worker-platform').value
    };
    WorkerActions.get_or_create(worker);
  }
});

if (typeof module !== 'undefined') {
  module.exports = WorkerRegistrationForm;
}