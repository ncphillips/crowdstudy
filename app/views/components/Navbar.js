'use strict';
var React = require('react');

// Components
var ExperimentList = require('./ExperimentList.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#crowd-study-navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">UPEI Crowd Study</a>
                    </div>

                    <div className="collapse navbar-collapse" id="crowd-study-navbar">
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Experiments <span className="caret"></span></a>
                                <ExperimentList className="dropdown-menu" role="menu"></ExperimentList>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        )
    }
});

