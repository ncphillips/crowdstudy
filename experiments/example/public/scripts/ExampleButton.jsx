'use strict';

var ExampleButton = React.createClass({
    getInitialState: function () {
        return {count: 0}
    },

    handleClick: function () {
        this.state.count++;
        this.setState(this.state);
    },

    render: function () {
        return (
            <input type="button" value={this.state.count} onClick={this.handleClick} />
        )
    }
});

React.render(
    <ExampleButton />,
    document.getElementById('example-button')
);
