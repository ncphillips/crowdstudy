'use strict';

var CrowdExperiment = require('CrowdExperiment');

var NewFormatComponent= React.createClass({
  render: function () {
    return (
      <div>
        <pre>{this.props.worker}</pre>
        <pre>{this.props.data}</pre>
        <input type="button" className="btn btn" onClick={this.finish_experiment} value="Finish Experiment"/>
      </div>
    )
  },

  getDefaultProps: function () {
    return {
      worker: {},
      exit: function (data, completed) {
        console.log("No Exit function providedk")
      }
    }
  },
  finish_experiment: function () {
    this.props.exit({}, true);
  }
});

var NewFormatApp = React.createClass({
  render: function () {
    console.log("App");
    return (
      <CrowdExperiment experiment_name="NewFormatApp" experiment_app={NewFormatComponent}/>
    );
  }
});

React.render(<NewFormatApp/>, document.getElementById('new-format-experiment'));
