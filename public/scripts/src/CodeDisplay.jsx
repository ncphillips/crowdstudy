'use strict';

//var React = require('react');

var CodeDisplay = React.createClass({
  render: function () {
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h2>Thank you for taking part in this UPEI HCI Lab experiment!</h2>
          <p>
            Please copy the following code and paste it into the textbox in the job you came from.
          </p>
          <div className="well">{this.props.code}</div>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
});

if (typeof module !== 'undefined') {
  module.exports = CodeDisplay;
}
