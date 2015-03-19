'use strict';

var ExampleInput = React.createClass({displayName: "ExampleInput",
    render: function () {
        return (
            React.createElement("input", {type: "text"})
        )
    }
});

React.render(
    React.createElement(ExampleInput, null),
    document.getElementById('example-input')
);
