'use strict';
var WORKER_REGISTRATION_URL = '/worker/register';
/**
 * This React component renders a page for capturing a crowd worker's id and platform.
 *
 *
 * @examle
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
        <div id="worker-id-form-additional-instructions">{this.props.children}</div>
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
  /**
   * Default properties for the WorkerIDForm component.
   * @returns {{url: string, callback: Function}}
   */
  getDefaultProps: function () {
    return {
      experiment: 'placeholder',
      callback: function () {
        console.log("WorkerRegistrationForm callback no provided.");
      }
    };
  },

  /**
   * Posts the worker ID to the `url` provided.
   *
   * Data Posted: {
   *   worker_id: 12345,
   *   platform: 'crowdflower',
   *   experiment_name: "example_experiment"
   * }
   *
   * Data Returned: {
   *    worker: {
   *        id: 12345,
   *        platform: 'crowdflower',
   *        experiments: {
   *          example_experiment: {
   *            completed: false,
   *            consent: null
   *          }
   *        }
   *        consent: null,
   *        registered: True
   * }
   */
  submitForm: function () {
    var worker_id = document.getElementById('worker-id').value;
    var platform = document.getElementById('worker-platform').value;

    $.ajax({
      url: WORKER_REGISTRATION_URL,
      type: 'POST',
      dataType: 'json',
      data: {
        worker: {
          id: worker_id,
          platform: platform
        },
        experiment_name: this.props.experiment_name
      },
      success: this.props.callback,
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

module.exports = WorkerRegistrationForm;