var WorkerActions = require('WorkerActions');
var MESSAGE = "Thank you for completing this survey, your response has been recorded.";
MESSAGE = "Are you a person?";

var DemographicSurvey = React.createClass({
  render: function () {
    var platform = '';
    if (this.props.worker.platform == "mturk") {
      platform = "=Mechanical+Turk";
    }
    else if (this.props.worker.platform == 'crowdflower'){
      platform = "=Crowdflower";
    }

    var cf_id = platform == "=Crowdflower" ? "=" + this.props.worker.id: '';
    var mturk_id = platform == "=Mechanical+Turk" ? "=" + this.props.worker.id: '';

    var url_array = [
      "/survey",
      "?entry.750975299", platform, "&", // Platform
      "&entry.79988863=" + this.props.worker.id
    ];

    var url = url_array.join('');

    return (
      <iframe id="demographic-survey-iframe" src={url} width={675} height={this.state.height}>
        <p> Unfortunately, your browser does not support this function.</p>
      </iframe>
    );
  },
  getInitialState: function () {
    return { height: window.innerHeight - 150 }
  },
  resetHeight: function () {
    this.setState({height: window.innerHeight - 150});
  },
  componentDidMount: function () {
    var _this = this;
    $('#demographic-survey-iframe').load(function () {
      try {
        var contentWindow = $(this).get(0).contentWindow.external;
        console.log(contentWindow);
      }
      catch (e){
        var update = {survey_completed: true};
        WorkerActions.update(_this.props.worker._id, update);
      }
    });
    window.onresize = this.resetHeight;
  }
});


module.exports = DemographicSurvey;