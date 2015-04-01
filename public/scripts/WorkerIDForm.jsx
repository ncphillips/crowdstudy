/**
 * React Props
 *
 * callback - The function called when the submit button is pressed.
 */
var WorkerIDForm = React.createClass({
    render: function () {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="worker_id">Worker ID:</label>
                    <input id="worker-id" type="text" name="worker_id" className="form-control"/>
                </div>
                <div className="form-group">
                    <input
                        id="worker-id-button"
                        type="button"
                        className="btn btn-primary form-control"
                        value="Submit"
                        onClick={this.props.callback}/>
                </div>
            </div>
        );
    }
});