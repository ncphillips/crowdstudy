'use strict';
var React = require('react');


/**
 * This is a
 * @type {*|Function}
 */
var ExampleLayout = React.createClass({
    render: function () {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <script src="http://fb.me/react-0.12.2.js"></script>
                    <script src="http://fb.me/JSXTransformer-0.12.2.js"></script>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"></link>
                    <link rel="stylesheet" href="/crowd-study.css"></link>
                </head>
                <body>
                    <div id="content" className="center-block center-block-no-float">
                        {this.props.children}
                    </div>

                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
                </body>
            </html>
        )
    }
});

module.exports = ExampleLayout;