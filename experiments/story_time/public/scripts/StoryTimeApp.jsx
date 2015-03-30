var start_time;
var end_time;

/**
 * Worker Performance Metrics.
 */
var StoryMetrics = React.createClass({
    render: function () {
        var avg = this.props.metrics.character_count ? this.props.metrics.character_count.average: 'N/A';
        var worker = this.props.metrics.character_count ? this.props.metrics.character_count.worker: 'N/A';

        var metrics = this.props.metrics;

        return (
            <div id="metrics" className="panel panel-default">
                <div className="panel-body">
                    <table>
                        <tr>
                            <td><b>Language</b></td>
                        </tr>

                    </table>
                </div>
            </div>
        );
    }
});


/**
 * Image
 */
var StoryImage = React.createClass({
    render: function () {
        return (
            <div id="story-image">
                <img src={this.props.img_url}></img>
            </div>
        );
    }
});


/**
 * Submit Button
 */
var StoryFormButton = React.createClass({
    handleClick: function () {
        this.props.onStorySubmit();
    },
    render: function () {
        var btn_text = this.props.submitting ? 'Submitting...' : 'Submit';
        return (
            <input type="button" className="btn btn-primary" onClick={this.handleClick} disabled={this.props.submitting} value={btn_text}/>
        );
    }
});

/**
 * Story Writing Form
 */
var StoryForm = React.createClass({
    render: function () {
        return (
            <form>
                <div className="form-group">
                    <textarea id="story-text" disabled={this.props.submitting} name="story-text" rows="4" className="form-control"></textarea>
                </div>
                <div className="form-group">
                    <StoryFormButton {...this.props}></StoryFormButton>
                </div>
            </form>
        );
    }
});


var CaptureWorkerId = React.createClass({
    handleClick: function () {
        this.props.captureWorkerId();
    },

    render: function () {
        return (
            <div>
                <label htmlFor="worker_id">Worker ID:</label>
                <input id="worker-id" type="text" name="worker_id" className="form-control"/>
                <input id="worker-id-button" type="button" className="btn btn-primary" value="Submit" onClick={this.handleClick}/>
            </div>
        );
    }
});

/**
 * The main app container.
 */
var StoryTime = React.createClass({
    getInitialState: function () {
        return {
            worker_id: null,
            submitting: true,
            story_num: null,
            img_url: '',
            code: '',
            metrics: {}
        };
    },

    /**
     * This function POSTs the given data to the server and updates the application's state with
     * the data that is returned.
     *
     * @param data
     */
    postData: function (data) {
        $.ajax({
            url: 'http://localhost:3000/story_time/submitStory',
            dataType: 'json',
            type: 'POST',

            data: data,

            success: function(state) {
                state.submitting = false;
                this.setState(state);
            }.bind(this),

            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    /**
     * This function is passed as a callback down through the app to the submit button so
     * it may invoke this callback when clicked. This fetches the story from the textare,
     * sets the state to 'submitting' and then posts the story to the server.
     *
     * @param event
     */
    handleStorySubmit: function (event) {
        var story_text = document.getElementById('story-text').value;

        this.setState({submitting: true});

        this.postData({
            worker_id: this.state.worker_id,
            story_num: this.state.story_num,
            story_text: story_text
        });
    },

    captureWorkerId: function () {
        var worker_id = document.getElementById('worker-id').value;
        this.setState({worker_id: worker_id});
        this.postData({
            worker_id: this.state.worker_id
        });
    },

    /**
     * Renders the StoryTime app.
     *
     * Initially the Worker's ID hasn't been captured, so we display the CaptureWorkerId component.
     *
     * Once the ID is captured, we render
     *
     * @returns {XML}
     */
    render: function () {
        if (this.state.worker_id) {
            return (
                <div>
                    <h2>Story: {this.state.story_num}</h2>
                    <p>
                        You will be shown a series of pictures. For each picture, write a short story about that
                        picture. The story you write only needs to be a couple sentences long.
                    </p>
                    <StoryMetrics metrics={this.state.metrics}></StoryMetrics>
                    <StoryImage img_url={this.state.img_url}></StoryImage>
                    <StoryForm onStorySubmit={this.handleStorySubmit} submitting={this.state.submitting}></StoryForm>
                </div>
            );
        }
        else {
            return (
                <div>
                    <CaptureWorkerId captureWorkerId={this.captureWorkerId}></CaptureWorkerId>
                </div>
            )
        }
    }
});


React.render(<StoryTime/>, document.getElementById('story-time'));


