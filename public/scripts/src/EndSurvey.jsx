'use strict';

if (typeof require !== 'undefined') {
  // Dependencies
  //var React = require('react');

  // Actions
  var WorkerActions = require('WorkerActions');
}

var EndSurvey = React.createClass({
  render: function () {

    var experiment = ExperimentStore.get();
    var url = '/comparisonSurvey';

    if (experiment.feedback_type === 'None') {
      url = '/noComparisonSurvey';
    }

    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <iframe id="demographic-survey-iframe" src={url} width={675} height={this.state.height}>
            <p> Unfortunately, your browser does not support this function.</p>
          </iframe>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  },
  getInitialState: function () {
    return { height: this.iframeHeight() }
  },
  resetHeight: function () {
    this.setState({height: this.iframeHeight()});
  },
  iframeHeight: function () {
    return window.innerHeight - 100;
  },
  componentDidMount: function () {
    window.onresize = this.resetHeight;

    var _this = this;
    $('#demographic-survey-iframe').load(function () {
      // Success when the survey is loaded.
      try {
        var contentWindow = $(this).get(0).contentWindow.external;
        console.log(contentWindow);
      }
        // Error once submitted.
      catch (e){
        var update = {end_survey_completed: true};
        WorkerActions.update(_this.props.worker._id, update);
      }
    });
  }
});

if (typeof module !== 'undefined') {
  module.exports = EndSurvey;
}