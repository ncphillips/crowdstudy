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
      "https://docs.google.com/a/upei.ca/forms/d/1s0LRC-3N7Bha75F6HrMBbkPBP5nNptIyKvR8ypG4uQs/viewform?",
      "entry.750975299", platform, "&", // Platform
      "entry.79988863", cf_id, "&",     // Crowdflower ID
      "entry.402697505", mturk_id  // MTurk ID
    ];

    //var url = url_array.join('');

    var url = '/survey';
    return (
      <div class="embed-responsive embed-responsive-16by9">
        <iframe id="demographic-survey-iframe" src={url} width={675} height={3000} className="embed-responsive-item">
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
        _this.props.callback();
      }
    });
  }
});


module.exports = DemographicSurvey;