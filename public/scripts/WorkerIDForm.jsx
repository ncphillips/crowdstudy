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
var WorkerIDForm = React.createClass({
    /**
     * Default properties for the WorkerIDForm component.
     * @returns {{url: string, callback: Function}}
     */
    getDefaultProps: function () {
        return {
            platform: 'crowdflower',
            url: '/workers',
            dataType: 'json',
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
        console.log("Hello");

        $.ajax({
            url: this.props.url,
            type: 'POST',
            dataType: this.props.dataType,
            data: {worker_id: worker_id, platform: this.props.platform},
            success: this.props.callback,
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
            <div id="worker-id-form">
                <div id="worker-id-form-additional-instructions">
                    {this.props.children}
                </div>
                <div className="form-group">
                    <label htmlFor="worker_id">Worker ID:</label>
                    <input
                        type="text"
                        id="worker-id"
                        name="worker-id"
                        className="form-control"/>
                </div>
                <div className="form-group">
                    <input type="button"
                        id="worker-id-button"
                        className="btn btn-primary form-control"
                        value="Submit"
                        onClick={this.submitForm}/>
                </div>
            </div>
        );
    }
});