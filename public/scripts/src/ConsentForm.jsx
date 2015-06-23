'use strict';

//var React = require('react');
if (typeof require !== 'undefined'){
  var EthicalStatement = require('Ethics');
}

var ConsentForm = React.createClass({
  render: function () {
    return (
      <div>
        <EthicalStatement/>
        <br/>
        <div>
          <p><b>Do you understand the information given above, and want to proceed&#63;</b></p>
          <div className="form-group row">
            <div className="col-sm-2"></div>
            <div className="col-sm-3">
              <input type="btn" className="btn btn-success" onClick={this.props.consent} defaultValue="Accept"/>
            </div>
            <div className="col-sm-1"></div>
            <div className="col-sm-3">
              <input type="btn" className="btn btn-danger"  onClick={this.props.noConsent} defaultValue="Reject"/>
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

if (typeof module !== 'undefined') {
  module.exports = ConsentForm;
}

