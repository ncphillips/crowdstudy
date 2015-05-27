'use strict';
var EthicalStatement = require('Ethics');

var ConsentForm = React.createClass({
  render: function () {
    return (
      <div>
        <EthicalStatement/>
        <div>
          <div className="form-group row">
            <div className="col-sm-2"></div>
            <div className="col-sm-3">
              <input type="btn" className="btn btn-success" onClick={this.props.consent} defaultValue="Yes"/>
            </div>
            <div className="col-sm-1"></div>
            <div className="col-sm-3">
              <input type="btn" className="btn btn-danger"  onClick={this.props.noConsent} defaultValue="No"/>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  },
  getDefaultProps: function () {
    return {
      consent: function () {
        console.log("No consent function provided to ConsentForm.");
      },
      noConsent: function () {
        console.log("No noConsent function provided to ConsentForm.");
      }
    };
  }
});

module.exports = ConsentForm;

