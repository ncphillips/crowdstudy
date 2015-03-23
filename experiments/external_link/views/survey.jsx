'use strict';

var React = require('react');
var ExampleLayout = require('./layouts/ExampleLayout.jsx');

var HelloMessage = React.createClass({
    render: function () {
        var worker_id_class = this.props.errors.worker_id ? 'form-group has-error': 'form-group';
        var name_class = this.props.errors.name ? 'form-group has-error': 'form-group';
        var yob_class = this.props.errors.yob ? 'form-group has-error': 'form-group';

        return (
            <ExampleLayout title="Example External Survey">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h1>External UPEI Survey</h1>
                    <div id="instrucitons">
                        <p>
                            Thank you for taking the time to do this survery.
                        </p>
                        <p>
                            In order to make sure you get the bonus at the end of this survey,
                            please paste your Crowdflower Contributor ID and paste it below. You
                            can find this ID in the Help dropdown back on Crowdflower site. See
                            the picture below:
                        </p>
                        <img src="contributor_id.png"/>
                    </div>
                    <form id="external-upei-form" action="#" method="POST">

                        <div className={worker_id_class}>
                            <label htmlFor="worker-id-input">Crowdflower Worker ID</label>
                            <input name="worker_id" id="worker-id-input" className="form-control" type="text" placeholder="Crowdflower Worker ID"/>
                            <span className="errors">{this.props.errors.worker_id}</span>
                        </div>
                        <div className={name_class}>
                            <label htmlFor="name">Name</label>
                            <input className="form-control" name="name" id="name"/>
                            <span className="errors">{this.props.errors.name}</span>
                        </div>
                        <div className={yob_class}>
                            <label htmlFor="yob">Year of Birth</label>
                            <input className="form-control" type="number" min="0" name="yob" id="yob"/>
                            <span className="errors">{this.props.errors.yob}</span>

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
