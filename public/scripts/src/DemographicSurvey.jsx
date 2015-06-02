var MESSAGE = "Thank you for completing this survey, your response has been recorded.";

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

    var url = url_array.join('');

    return (
      <div>
        <iframe id="demographic-survey-iframe" src={url} width={200} width={500}>
          <p> Unfortunately, your browser does not support this function.</p>
        </iframe>
      </div>
    );
  },
  componentDidMount: function () {
    setInterval(this.checkIfComplete, 2000);
  },
  checkIfComplete: function () {

    var text = ($("#demographic-survey-iframe").contents().find("body").html());
    if (text.indexOf(MESSAGE) > -1){
      alert("Woo");
    }
  }
});

module.exports = DemographicSurvey;