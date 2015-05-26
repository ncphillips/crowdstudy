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
 *        <WorkerIDForm url="/registerWorker" callback={this.workerRegistered}>
 *            Here is some additional information pertaining to this experiment.
 *        </WorkerIDForm>
 *      );
 *   }
 * }
 */
var WorkerInfo = React.createClass({
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
          <input type="button" id="worker-id-button" className="btn btn-primary form-control" value="Submit" onClick={this.submitForm}/>
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
      platform: '',
      experiment: 'placeholder',
      url: '/worker',
      dataType: 'json',
      callback: function (data) {
        console.log('The WorkerInfo component was not supplied `callback` property.');
      }
    };
  },

  /**
   * Posts the worker ID to the `url` provided.
   *
   * Data Posted: {
   *   worker_id: 12345,
   *   platform: 'crowdflower'
   * }
   *
   * Data Returned: {
   *    worker: {
   *        id: 12345,
   *        platform: 'crowdflower',
   *        consent: null,
   *        registered: True
   * }
   */
  submitForm: function () {
    var worker_id = document.getElementById('worker-id').value;
    var platform = document.getElementById('worker-platform').value;

    console.log(worker_id, platform);

    $.ajax({
      url: this.props.url,
      type: 'POST',
      dataType: this.props.dataType,
      data: {
        worker_id: worker_id,
        platform: platform,
        experiment_name: this.props.experiment_name
      },
      success: this.props.callback,
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

module.exports = WorkerInfo;