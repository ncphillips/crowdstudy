/**
 * Worker Performance Metrics.
 */
var StoryMetrics = React.createClass({displayName: "StoryMetrics",
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
                React.createElement(BarChart_OX_LY, {id: "time-chart", data: data})
            );
        }
        else {
            return (React.createElement("div", null))
        }
    }
});


/**
 * Image
 */
var StoryImage = React.createClass({displayName: "StoryImage",
    render: function () {
        return (
            React.createElement("div", {id: "story-image"}, 
                React.createElement("img", {src: this.props.img_url})
            )
        );
    }
});

/**
 * Submit Button
 */
var StoryFormButton = React.createClass({displayName: "StoryFormButton",
    render: function () {
        var btn_text = this.props.submitting ? 'Submitting...' : 'Submit';
        return (
            React.createElement("input", {type: "button", className: "btn btn-primary", onClick: this.props.clickCallback, disabled: this.props.submitting, value: btn_text})
        );
    }
});

/**
 * Submit Button
 */
var Button = React.createClass({displayName: "Button",
    handleClick: function () {
        this.props.clickCallback();
    },
    render: function () {
        var className = this.props.className || '';
        var value = this.props.value || 'Submit';
        var disabled = this.props.disabled || false;
        return (
            React.createElement("input", {type: "button", className: className, disabled: disabled, value: value, onClick: this.handleClick})
        );
    }
});



/**
 * Story Writing Form
 */
var StoryForm = React.createClass({displayName: "StoryForm",
    render: function () {
        var btn_text = this.props.submitting ? 'Submitting...' : 'Submit';

        return (
            React.createElement("form", null, 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("textarea", {id: "story-text", disabled: this.props.submitting, name: "story-text", rows: "4", className: "form-control"})
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement(StoryFormButton, {
                        value: btn_text, 
                        disabled: this.props.submitting, 
                        className: "btn btn-primary", 
                        clickCallback: this.props.storySubmitCallback})
                )
            )
        );
    }
});

var StoryTime = React.createClass({displayName: "StoryTime",
    render: function () {
        return (
        React.createElement("div", null, 
            React.createElement("h2", null, "Story: ", this.props.story_num), 
            React.createElement("p", null, 
                "You will be shown a series of pictures. For each picture, write a short story about that" + ' ' +
                "picture. The story you write only needs to be a couple sentences long."
            ), 
            React.createElement(StoryMetrics, {metrics: this.props.metrics}), 
            React.createElement(StoryImage, {img_url: this.props.img_url}), 
            React.createElement(StoryForm, {storySubmitCallback: this.props.callback, submitting: this.props.submitting})
        )
        );
    }
});


/**
 * The main app container.
 */
var StoryTimeApp = React.createClass({displayName: "StoryTimeApp",
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

    workerIdFormCallback: function (data) {
        this.setState(data);
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
        if (this.state.code) {
            return React.createElement(CodeDisplay, {code: this.state.code});
        }
        else if (this.state.worker_id) {
            return React.createElement(StoryTime, React.__spread({},  this.state, {callback: this.storySubmitCallback}));
        }
        else {
            return (
                React.createElement(WorkerIDForm, {callback: this.workerIdFormCallback, url: "/worker"}, 
                    React.createElement(EthicalStatement, null)
                )
            );
        }
    }
});



React.render(React.createElement(StoryTimeApp, null), document.getElementById('app'));


