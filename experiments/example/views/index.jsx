'use strict';

var React = require('react');
var ExampleLayout = require('./layouts/ExampleLayout.jsx');

var HelloMessage = React.createClass({
    render: function () {
        return (
            <ExampleLayout title={this.props.title}>
                <h1>Hello</h1>
                    <p>This is an example page for an experiment.</p>
                    <div id="example-input"></div>
                    <div id="example-button"></div>
                <script type="text/jsx" src="scripts/ExampleButton.js"></script>
                <script type="text/jsx" src="scripts/ExampleInput.js"></script>
            </ExampleLayout>
        );
    }
});

module.exports = HelloMessage;
