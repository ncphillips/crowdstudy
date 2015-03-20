'use strict';

var ExampleButton = React.createClass({displayName: "ExampleButton",
    getInitialState: function () {
        return {count: 0}
    },

    handleClick: function () {
        this.state.count++;
        this.setState(this.state);
    },

    render: function () {
        return (
            React.createElement("input", {type: "button", value: this.state.count, onClick: this.handleClick})
        )
    }
});

React.render(
    React.createElement(ExampleButton, null),
    document.getElementById('example-button')
);
