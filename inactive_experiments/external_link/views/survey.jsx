'use strict';

var React = require('react');
var ExampleLayout = require('./layouts/ExampleLayout.jsx');

var Crowdflower = {
    instructions: React.createClass({
        render: function () {
            console.log("Rendering Crowdflower");
            return (
                <div id="instructions">
                    <p>
                        Before we get started, we need your contributor id. You can find it in
                        the <b>help</b> dropdown of the Crowdflower interface.
                    </p>
                    <img src="crowdflower_worker_id.png"></img>
                </div>
                    );
        }
    }),
    form_fields: React.createClass({
        render: function () {
            return (<div></div>);
        }
    })
};

var MechanicalTurk = {
    instructions: React.createClass({
        render: function () {
            return (
                <div id="instructions">
                    <p>
                        Before we get started, we need your worker id. You can find it in
                        the Mechanical Turk <a href="https://www.mturk.com/mturk/dashboard">Worker Dashboard</a>.
                    </p>
                    <img src="mturk_worker_id.png"></img>
                </div>
            );
        }
    }),

    form_fields: React.createClass({
        render: function () {
            return ( <div> <input name="hit_id" value={this.props.hitId} type="hidden"/>  </div> );
        }
    })
};

var Survey = React.createClass({
    render: function () {
        var Platform = null;
        // Load Platform Specific Instructions
        if (this.props.platform === 'crowdflower'){
            Platform = Crowdflower
        }
        else {
            Platform = MechanicalTurk
        }

        var Instructions = Platform.instructions;
        var ExtraFields = Platform.form_fields;

        // Alter input classes if there's an error for that field.
        var worker_id_class = this.props.errors.worker_id? 'form-group has-error': 'form-group';
        var name_class = this.props.errors.name ? 'form-group has-error': 'form-group';
        var yob_class = this.props.errors.yob ? 'form-group has-error': 'form-group';

        return (
            <ExampleLayout title="Example External Survey">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h1>External UPEI Survey</h1>
                    <Instructions></Instructions>
                    <form id="external-upei-form" action="#" method="POST">
                        <input type="hidden" name="platform" value={this.props.platform}/>

                        <ExtraFields {...this.props}></ExtraFields>

                        <div className={worker_id_class}>
                            <label htmlFor="id">Worker ID</label>
                            <input className="form-control" name="worker_id" id="worker_id"/>
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

module.exports = Survey;
