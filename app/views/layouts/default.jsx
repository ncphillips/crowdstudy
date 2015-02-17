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

                    <script src="http://fb.me/react-0.12.2.js"></script>
                    <script src="http://fb.me/JSXTransformer-0.12.2.js"></script>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"></link>
                </head>
                <body>
                    <Navbar></Navbar>

                    <div id="content">
                        {this.props.children}
                    </div>
                </body>
            </html>
        )
    }
});

module.exports = DefaultLayout;
