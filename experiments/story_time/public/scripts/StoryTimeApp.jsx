/**
 * Worker Performance Metrics.
 */
var StoryMetrics = React.createClass({
    character_count: {
        create: function (e) {
            
        }
    },
    render: function () {
        var metrics = this.props.metrics;
        if (metrics.character_count) {
            var data = [
                { value: metrics.character_count.average, name: 'Average'},
                { value: metrics.character_count.worker, name: 'You'}];

            return (
                <BarChart data={data}></BarChart>
            );
        }
        else {
            return (<div></div>)
        }
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
    render: function () {
        var btn_text = this.props.submitting ? 'Submitting...' : 'Submit';
        return (
            <input type="button" className="btn btn-primary" onClick={this.props.clickCallback} disabled={this.props.submitting} value={btn_text}/>
        );
    }
});

/**
 * Submit Button
 */
var Button = React.createClass({
    handleClick: function () {
        this.props.clickCallback();
    },
    render: function () {
        var className = this.props.className || '';
        var value = this.props.value || 'Submit';
        var disabled = this.props.disabled || false;
        return (
            <input type="button" className={className} disabled={disabled} value={value} onClick={this.handleClick}/>
        );
    }
});



/**
 * Story Writing Form
 */
var StoryForm = React.createClass({
    render: function () {
        var btn_text = this.props.submitting ? 'Submitting...' : 'Submit';

        return (
            <form>
                <div className="form-group">
                    <textarea id="story-text" disabled={this.props.submitting} name="story-text" rows="4" className="form-control"></textarea>
                </div>
                <div className="form-group">
                    <StoryFormButton
                        value={btn_text}
                        disabled={this.props.submitting}
                        className="btn btn-primary"
                        clickCallback={this.props.storySubmitCallback}></StoryFormButton>
                </div>
            </form>
        );
    }
});

var StoryTime = React.createClass({
    render: function () {
        return (
        <div>
            <h2>Story: {this.props.story_num}</h2>
            <p>
                You will be shown a series of pictures. For each picture, write a short story about that
                picture. The story you write only needs to be a couple sentences long.
            </p>
            <StoryMetrics metrics={this.props.metrics}></StoryMetrics>
            <StoryImage img_url={this.props.img_url}></StoryImage>
            <StoryForm storySubmitCallback={this.props.callback} submitting={this.props.submitting}></StoryForm>
        </div>
        );
    }
});

var EthicsAndWorkerID = React.createClass({
    render: function () {
        return (
            <div>
            <EthicalStatement></EthicalStatement>
            <WorkerIDForm callback={this.props.callback}></WorkerIDForm>
        </div>
        );
    }
});



/**
 * The main app container.
 */
var StoryTimeApp = React.createClass({
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
                state.start_time = new Date();
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
    storySubmitCallback: function (event) {
        var story_text = document.getElementById('story-text').value;

        this.setState({submitting: true});

        this.postData({
            worker_id: this.state.worker_id,
            time: {
                start: this.state.start_time,
                end: new Date()
            },
            story_num: this.state.story_num,
            story_text: story_text
        });
    },

    captureWorkerIdCallback: function () {
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
        if (this.state.code) return <CodeDisplay code={this.state.code}></CodeDisplay>;
        else if (this.state.worker_id) { return <StoryTime {...this.state} callback={this.storySubmitCallback}></StoryTime>; }
        else return <EthicsAndWorkerID callback={this.captureWorkerIdCallback}></EthicsAndWorkerID>

    }
});



React.render(<StoryTimeApp/>, document.getElementById('story-time'));


