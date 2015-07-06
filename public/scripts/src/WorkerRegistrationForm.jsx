'use strict';
if (typeof require !== 'undefined') {
  var WorkerActions = require('WorkerActions');
}


var WorkerRegistrationForm = React.createClass({
  render: function () {
    var img_url = '/images';
    switch (this.state.platform) {
      case "mturk": img_url += '/mturk_id.png'; break;
      case "crowdflower": img_url += '/crowdflower_id.png'; break;
    }
    var areaClass = "form-group";
    var errorMessage = null;
    if (this.state.error) {
      errorMessage = (<div className="alert alert-danger" role="alert">{this.state.error}</div>);
      areaClass = "form-group has-error";
    }
    return (
      <div>
        <div className="col-md-3"></div>
        <div id="worker-id-form" className="col-md-6">
          <div id="worker-id-form-additional-instructions">
            <h1 className="text-center">UPEI HCI Lab </h1>
            <p> We are studying crowd work. </p>
            <p> Before starting, please tell us what platform you are coming from, and what you're worker ID is. </p>
          </div>
          <div className="form-group">
            <label htmlFor="worker-platform">Platform</label>
            <select id="worker-platform" ref='platform' className="form-control" onChange={this._onPlatformChange}>
              <option value="crowdflower">CrowdFlower</option>
              <option value="mturk">Amazaon Mechanical Turk</option>
            </select>
          </div>
          <div className={areaClass}>
            <label htmlFor="worker_id">Worker ID</label>
            <input type="text" ref='worker_id' id="worker-id" name="worker-id" className="form-control"/>
          </div>
          {errorMessage}
          <div className="form-group">
            <input type="button" id="worker-id-button"
              className="btn btn-primary form-control"
              value="Submit" onClick={this.submitForm}/>
          </div>
          <img className="center-block" src={img_url} alt="Uh oh"/>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  },
  getInitialState: function () {
    return {
      platform: "crowdflower",
      error: ""
    };
  },
  _onPlatformChange: function (e) {
    this.setState({platform: e.target.value});
  },
  submitForm: function () {
    var worker = {
      id: document.getElementById('worker-id').value,
      platform: document.getElementById('worker-platform').value
    };
    if (worker.id.length > 0) {
      WorkerActions.get_or_create(worker);
    } else {
      this.setState({error: "Please supply your worker ID."});
    }
  }
});

if (typeof module !== 'undefined') {
  module.exports = WorkerRegistrationForm;
}