'use strict';

var ExampleInput = React.createClass({
    render: function () {
        return (
            <input type="text" />
        )
    }
});

React.render(
    <ExampleInput />,
    document.getElementById('example-input')
);
