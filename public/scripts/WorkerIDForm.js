/**
 * This React component renders a page for capturing
 * @examle
 *
 * var MyApp = {
 *   workerRegistered: function (updated_state) {
 *      this.setState(updated_state);
 *   },
 *   render: function () {
 *      return (
 *        <WorkerIDForm url="/registerWorker" callback={this.workerRegistered}>
 *            Here is some additional information pertaining to this experiment.
 *        </WorkerIDForm>
 *      );
 *   }
 * }
 */
var WorkerIDForm = React.createClass({displayName: "WorkerIDForm",
    /**
     * Default properties for the WorkerIDForm component.
     * @returns {{url: string, callback: Function}}
     */
    getDefaultProps: function () {
        return {
            url: '/workers',
            callback: function (data) {
                console.log('The WorkerIDForm was not supplied`callback` property.');
            }
        };
    },

    /**
     * Posts the worker ID to the `url` provided.
     */
    submitForm: function () {
        var worker_id = document.getElementById('worker-id').value;

        $.ajax({
            url: this.props.url,
            type: 'POST',
            dataType: 'json',
            data: {worker_id: worker_id},
            success: this.callback,
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    /**
     * Renders the form for capturing the Worker's ID.
     * @returns {XML}
     */
    render: function () {
        return (
            React.createElement("div", {id: "worker-id-form"}, 
                React.createElement("div", {id: "worker-id-form-additional-instructions"}, 
                    this.props.children
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {htmlFor: "worker_id"}, "Worker ID:"), 
                    React.createElement("input", {
                        type: "text", 
                        id: "worker_id", 
                        name: "worker_id", 
                        className: "form-control"})
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("input", {type: "button", 
                        id: "worker-id-button", 
                        className: "btn btn-primary form-control", 
                        value: "Submit", 
                        onClick: this.submitForm})
                )
            )
        );
    }
});