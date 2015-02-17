var React = require('react');
var ExperimentList = require('../components/experiment_list.jsx');

var DefaultLayout = React.createClass({
    render: function () {
        return <html>
            <head>
                <title>{this.props.title}</title>

                <script src="http://fb.me/react-0.12.2.js"></script>
                <script src="http://fb.me/JSXTransformer-0.12.2.js"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"></link>
            </head>
            <body>
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

                <div id="content">
                {this.props.children}
                </div>
            </body>
        </html>
    }
});

module.exports = DefaultLayout;
