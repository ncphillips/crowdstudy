'use strict';

if (typeof require !== 'undefined') {
  // Dependencies
  //var React = require('react');

  // Stores
  var WorkerStore = require('WorkerStore');
  var ExperimentStore = require('ExperimentStore');

  // Actions
  var WorkerActions = require('WorkerActions');
  var ExperimentActions = require('ExperimentActions');

  // Components
  var DemographicSurvey = require('DemographicSurvey');
  var WorkerRegistrationForm = require('WorkerRegistrationForm');
  var ConsentForm = require('ConsentForm');
  var CodeDisplay = require('CodeDisplay');
}

/**
 * CrowdExperiment Component-View
 */
var CrowdExperiment = React.createClass({
  render: function () {
    var component_to_render = null;

    // Collect Worker Info
    if (!this.state.worker){
      component_to_render =  <WorkerRegistrationForm experiment_name={this.props.experiment_name}/>
    }
    else if (!this.state.experiment){
      component_to_render = <p>Loading...</p>;
    }
    // If experiment completed -> Display Exeriment-Completion Code
    else if (this.state.experiment.completed === true ||  this.state.experiment.completed === 'true' || this.state.experiment.code) {
      component_to_render = <CodeDisplay code={this.state.experiment.code}/>
    }
    // If consent denied -> Display Exit Page
    else if (this.state.experiment.consent === false) {
      component_to_render = <p>Thank you for your time.</p>;
    }
    // Ask for Consent
    else if (this.state.experiment.consent === null) {
      component_to_render = <ConsentForm consent={this.consent} noConsent={this.noConsent}/>;
    }
    // If survey not completed -> Display
    //else if (!this.state.worker.survey_completed) {
    //  component_to_render = <DemographicSurvey worker={this.state.worker} callback={this.surveyCompleted}/>
    //}
    // Run Experiment.
    else if (this.state.experiment.consent) {
      component_to_render = <this.props.experiment_app worker={this.state.worker} data={this.state.experiment} exit={this.exit}/>
    }

    return (
      <div>
        {component_to_render}
      </div>
    );
  },

  ///////////////////////
  // Lifecycle Methods //
  ///////////////////////
  getInitialState: function () {
    return {
      worker: null,
      experiment: null
    }
  },

  componentDidMount: function () {
    WorkerStore.addChangeListener(this.loadWorker);
    ExperimentStore.addChangeListener(this.loadExperiment);
  },

  /////////////////////
  // Store Callbacks //
  /////////////////////

  loadWorker: function () {
    this.setState({
      worker: WorkerStore.get()
    }, this.registerExperiment);
  },
  loadExperiment: function () {
    this.setState({
      experiment: ExperimentStore.get()
    });
  },

  /////////////////////
  // Action Triggers //
  /////////////////////
  registerExperiment: function () {
    if (this.state.experiment === null) {
      ExperimentActions.register(this.state.worker._id, this.props.experiment_name);
    }
  },
  consent: function () {
    var _id = this.state.worker._id;
    var name = this.props.experiment_name;
    var experiment = this.state.experiment;
    experiment.consent = true;
    ExperimentActions.update(_id, name, experiment);
  },
  noConsent: function () {
    var _id = this.state.worker._id;
    var name = this.props.experiment_name;
    var experiment = this.state.experiment;
    experiment.consent = false;
    ExperimentActions.update(_id, name, experiment);
  },
  revokeConsent: function () {
    this.noConsent();
  },
  exit: function (data) {
    var _id = this.state.worker._id;
    var name = this.props.experiment_name;
    var experiment = this.state.experiment;
    experiment.completed = true;
    experiment.data = data;

    ExperimentActions.update(_id, name, experiment);
    ExperimentActions.markComplete(_id, name);
  }
});

if (typeof module !== 'undefined') {
  module.exports = CrowdExperiment;
}
