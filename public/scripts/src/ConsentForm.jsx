'use strict';

//var React = require('react');
if (typeof require !== 'undefined'){
  var EthicalStatement = require('Ethics');
}

var ConsentForm = React.createClass({
  render: function () {
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6 text-center">
          <EthicalStatement/>
          <br/>
          <div className="row">
            <p><b>Do you understand the information given above, and want to proceed&#63;</b></p>
            <div className="form-group row">
              <div className="col-xs-6 text-center">
                <input type="btn" className="btn btn-success " onClick={this.props.consent} defaultValue="Accept"/>
              </div>
              <div className="col-xs-6 text-center">
                <input type="btn" className="btn btn-danger"  onClick={this.props.noConsent} defaultValue="Reject"/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
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

