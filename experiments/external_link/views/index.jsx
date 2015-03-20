'use strict';

var React = require('react');
var ExampleLayout = require('./layouts/ExampleLayout.jsx');

var HelloMessage = React.createClass({
    render: function () {
        return (
            <ExampleLayout title={this.props.title}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h1>External UPEI Survey</h1>
                    <form id="external-upei-form" action="#" method="POST">
                        <div className="form-group">
                            <label htmlFor="worker-id-input">Crowdflower Worker ID</label>
                            <input name="worker_id" id="worker-id-input" className="form-control" type="text" placeholder="Crowdflower Worker ID"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input className="form-control" name="name" id="name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="yob">Year of Birth</label>
                            <input className="form-control" type="number" min="0" name="yob" id="yob"/>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="form-control btn btn-primary" value="Submit"/>
                        </div>
                    </form>
                </div>
                <div className="col-md-2"></div>
            </ExampleLayout>
        );
    }
});

module.exports = HelloMessage;
