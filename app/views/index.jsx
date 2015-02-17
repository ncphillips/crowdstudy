'use strict';
var React = require('react');
var DefaultLayout = require('./layouts/default');

module.exports = React.createClass({
    render: function () {
        return (
            <DefaultLayout title={this.props.title}>
                <h1>UPEI HCI Labs</h1>
            </DefaultLayout>
        )
    }
});

