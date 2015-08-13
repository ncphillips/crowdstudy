var MIN_ANSWER_LENGTH = 1;

var Questions = React.createClass({
  render: function () {
    "use strict";
    var error = this.state.answerError;
    var areaClass = "form-group";
    var errorMessage = null;
    if (error) {
      errorMessage = (<div className="alert alert-danger" role="alert">{error}</div>);
      areaClass = "form-group has-error";
    }
    var buttonDisabled = this.state.wait > 0;
    var buttonText = buttonDisabled ? "Continue in " + this.state.wait + " seconds." : "Continue";

    var questions = this.state.questions.map(function (text, i) {
      var refName = "answer_" + i;
      return (
        <div>
          <p>{text}</p>
          <div className={areaClass}>
            <textarea id={refName} ref={refName} className="form-control"/>
          </div>
        </div>
      );
    });

    return (
      <div>
        <h4>Please look at your feedback table above carefully, and answer the questions below to complete this round.</h4>
        <h5>Remeber we will be evaluating the accuracy of your answers before rewarding your bonus, so please answer accurately and honestly.</h5>
        {questions}
        <input type="button" className="btn btn-block btn-default" value={buttonText} disabled={buttonDisabled} onClick={this.saveAnswer}/>
        {errorMessage}
      </div>
    );
  },

  ///////////////////////
  // Lifecycle Methods //
  ///////////////////////
  getDefaultProps: function () {
    return {
      is_first_feedback: true
    };
  },
  getInitialState: function () {
    return {
      wait: 5,
      questions: [],
      answerError: '',
      worker: {},
      experiment: {}
    };
  },
  componentDidMount: function () {
    this.setState({
      worker: WorkerStore.get(),
      experiment: ExperimentStore.get()
    }, this.setQuestion);
    this._wait();
  },
  ////////////
  // Others //
  ////////////
  setQuestion: function (){
    var experiment = ExperimentStore.get();
    var questions = [];

    if (experiment.feedback_type === 'None' || this.props.is_first_feedback) {
      questions = _questions.no_comparison;
    } else {
      questions = _questions.comparison;
    }

    this.setState({questions: questions});
  },
  saveAnswer: function () {
    var output = [];
    var errors = {

    };
    this.state.questions.forEach(function (question, i) {
      var answer = document.getElementById('answer_' + i).value;
      console.log(i, answer, answer.length < 1);
      if (answer.length < 1) {
        errors[i] = "Please input an answer.";
      }
      else {
        output.push({
          question: question,
          answer: answer
        });
      }
    });

    if (!Object.getOwnPropertyNames(errors).length) {
      this.props.callback(output);
    }
    else {
      this.setState({answerError: "Please input an answer."});
    }
  },
  _wait: function () {
    if (this.state.wait > 0) {
      setTimeout(this._wait, this.state.wait * 500);
      this.setState({wait: this.state.wait - 1});
    }
  }
});

if (typeof module !== 'undefined') {
  module.exports = Questions;
}
