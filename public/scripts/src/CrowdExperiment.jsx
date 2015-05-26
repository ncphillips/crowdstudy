'use strict';

var WorkerInfo = require('Worker');
var ConsentForm = require('ConsentForm');
var CodeDisplay = require('CodeDisplay');

var GIVE_CONSENT_URL = '';
var REVOKE_CONSENT_URL = '';

/**
 * CrowdExperiment
 *
 * This is a React application for running an crowd work experiment.
 *
 */
var CrowdExperiment = React.createClass({
  render: function () {
    var component_to_render = null;
    console.log("Children:", this.props.children);

    // Collect Worker Info
    if (!this.state.worker.id || !this.state.worker.platform){
      console.log("Getting worker info.");
      component_to_render = this.workerInfoComponent()
    }
    else if (this.state.experiment.consent === false) {
      component_to_render = (<p>Thank you for your time.</p>);
    }
    // Ask for Consent
    else if (this.state.experiment.consent == null) {
      console.log("Getting consent");
      component_to_render = this.consentComponent();
    }
    // Show experiment.
    else if (this.state.experiment.consent) {
      console.log("Starting experiment.");
      component_to_render = this.props.children;
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
        platform: '',
      },

      // State Data to be used by the Experiment.
      experiment: {
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
  workerRetrieved: function (worker) {
    var w = {
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
  },
  revokeConsent: function () {
    console.log("Consent revoked.");
  },

  // Sub components.
  workerInfoComponent: function () {
    return (
      <WorkerInfo experiment_name={this.props.experiment_name} callback={this.workerRetrieved}>
        <p>
          We are studying crowd work.
        </p>
        <p>
          Before starting, please tell us what platform you are coming from, and what you're worker ID is.
        </p>
      </WorkerInfo>
    );
  },
  consentComponent: function () {
    return <ConsentForm consent={this.consent} noConsent={this.noConsent}/>
  }

});

module.exports = CrowdExperiment;
