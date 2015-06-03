'use strict';

var DemographicSurvey = require('DemographicSurvey');
var WorkerRegistrationForm = require('WorkerRegistrationForm');
var ConsentForm = require('ConsentForm');
var CodeDisplay = require('CodeDisplay');

var GIVE_CONSENT_URL = '';
var REVOKE_CONSENT_URL = '';

/**
 * CrowdExperiment
 *
 * This is a controller-view.
 */
var CrowdExperiment = React.createClass({
  render: function () {
    var component_to_render = null;

    // Collect Worker Info
    if (!this.state.worker.id || !this.state.worker.platform){
      component_to_render = this.workerRegistrationForm()
    }
    //else if (!this.state.worker.survey_completed) {
    //  component_to_render = <DemographicSurvey worker={this.state.worker}/>
    //}
    // Display Exeriment-Completion Code
    else if (this.state.experiment.completed) {
      component_to_render = <CodeDisplay code={this.state.experiment.code}/>
    }
    // Display Exit Page
    else if (this.state.experiment.consent === false) {
      component_to_render = (<p>Thank you for your time.</p>);
    }
    // Ask for Consent
    else if (this.state.experiment.consent == null) {
      component_to_render = this.consentComponent();
    }
    // Run Experiment.
    else if (this.state.experiment.consent) {
      component_to_render = <this.props.experiment_app worker={this.state.worker} data={this.state.experiment} exit={this.exit}/>
    }

    return (
      <div>
        <h1>UPEI HCI Lab Research on Crowd Work</h1>
        {component_to_render}
      </div>
    );
  },

  // Setup
  getInitialState: function () {
    return {
      // Worker Information
      worker: {
        id: '',
        platform: ''
      },

      // State Data to be used by the Experiment.
      experiment: {
        code: '',
        consent: null,
        completed: false
      }
    };
  },
  getDefaultProps: function () {
    return {
      experiment_name: 'ExampleExperimentName'
    };
  },

  // Worker Information
  workerDidUpdate: function (worker) {
    console.log(worker);
    var w = {
      _id: worker._id,
      id: worker.id,
      platform: worker.platform
    };

    var e = worker.experiments[this.props.experiment_name];
    this.setState({worker: w, experiment: e});
  },

  // Consent
  consent: function () {
    var experiment = this.state.experiment;
    experiment.consent = true;
    this.setState({experiment: experiment});
  },
  noConsent: function () {
    var experiment = this.state.experiment;
    experiment.consent = false;
    this.setState({experiment: experiment});
    // Update Database
  },
  revokeConsent: function () {
    this.setState({experiment: {consent: false}});
    // Update Database
  },

  // Sub components.
  workerRegistrationForm: function () {
    return (
      <WorkerRegistrationForm experiment_name={this.props.experiment_name} callback={this.workerDidUpdate}>
        <p>
          We are studying crowd work.
        </p>
        <p>
          Before starting, please tell us what platform you are coming from, and what you're worker ID is.
        </p>
      </WorkerRegistrationForm>
    );
  },
  consentComponent: function () {
    return <ConsentForm consent={this.consent} noConsent={this.noConsent}/>
  },

  // Experiment Completed.
  exit: function (data) {
    // Update database.
    var experiment = this.state.experiment;
    experiment.data = data;
    experiment.completed = true;

    $.ajax({
      url: '/worker/submit',
      type: 'POST',
      dataType: 'json',
      data: {
        worker: this.state.worker,
        experiment: experiment,
        experiment_name: this.props.experiment_name
      },
      success: this.workerDidUpdate,
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

module.exports = CrowdExperiment;
