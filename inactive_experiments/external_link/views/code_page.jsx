'use strict';

var React = require('react');
var ExampleLayout = require('./layouts/ExampleLayout.jsx');

var CodePage= React.createClass({
    render: function () {
        return (
            <ExampleLayout title={this.props.title}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h1>Thank you for completing your survey.</h1>
                    <p>
                        Copy the following code and paste into the text field back on Crowdflower.
                    </p>
                    <p className="form-control">
                    {this.props.code}
                    </p>


                </div>
                <div className="col-md-2"></div>
            </ExampleLayout>
        );
    }
});

module.exports = CodePage;
