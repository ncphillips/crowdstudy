/**
 * React Props
 *
 * callback - The function called when the submit button is pressed.
 */
var WorkerIDForm = React.createClass({displayName: "WorkerIDForm",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {htmlFor: "worker_id"}, "Worker ID:"), 
                    React.createElement("input", {id: "worker-id", type: "text", name: "worker_id", className: "form-control"})
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("input", {
                        id: "worker-id-button", 
                        type: "button", 
                        className: "btn btn-primary form-control", 
                        value: "Submit", 
                        onClick: this.props.callback})
                )
            )
        );
    }
});