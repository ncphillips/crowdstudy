'use strict';

var React = require('react');
var ExampleLayout = require('./layouts/ExampleLayout.jsx');

var ErrorPage= React.createClass({
    render: function () {
        return (
            <ExampleLayout title={this.props.title}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h1>Uh oh!</h1>
                    <p>
                        Something went wrong! Please refresh the page and try again.
                    </p>
                </div>
                <div className="col-md-2"></div>
            </ExampleLayout>
        );
    }
});

module.exports = ErrorPage;
