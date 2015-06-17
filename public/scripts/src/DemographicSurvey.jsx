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
      <div className="embed-responsive embed-responsive-16by9">
        <iframe id="demographic-survey-iframe" src={url} width={675} height={750} className="embed-responsive-item">
          <p> Unfortunately, your browser does not support this function.</p>
        </iframe>
      </div>
    );
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
  }
});


module.exports = DemographicSurvey;