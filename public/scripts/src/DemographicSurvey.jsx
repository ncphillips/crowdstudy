'use strict';

if (typeof require !== 'undefined') {
  // Dependencies
  //var React = require('react');

  // Actions
  var WorkerActions = require('WorkerActions');
}

var DemographicSurvey = React.createClass({
  render: function () {
    var url = '/survey';

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
        var update = {survey_completed: true};
        WorkerActions.update(_this.props.worker._id, update);
      }
    });
  }
});

function ss() {
  var worker = WorkerStore.get();
  WorkerActions.update(worker._id, {survey_completed: true, survey_skipped: true});
}

if (typeof module !== 'undefined') {
  module.exports = DemographicSurvey;
}