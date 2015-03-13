'use strict';
var React = require('react');

// Components
var Navbar = require('../components/Navbar');

var DefaultLayout = React.createClass({
    render: function () {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>

                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"></link>
                    <link rel="stylesheet" href="crowd-study.css"></link>
                </head>
                <body>
                    <Navbar></Navbar>

                    <div id="content" className="center-block center-block-no-float">
                        {this.props.children}
                    </div>

                    <script src="http://fb.me/react-0.12.2.js"></script>
                    <script src="http://fb.me/JSXTransformer-0.12.2.js"></script>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
                </body>
            </html>
        )
    }
});

module.exports = DefaultLayout;