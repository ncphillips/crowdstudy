var start_time;
var end_time;

/**
 * Worker Performance Metrics.
 */
var StoryMetrics = React.createClass({displayName: "StoryMetrics",
    render: function () {
        var metrics = this.props.metrics;

        var language = metrics.alchemy.language || '';

        return (
            React.createElement("div", {id: "metrics", className: "panel panel-default"}, 
                React.createElement("div", {className: "panel-body"}, 
                    React.createElement("table", null, 
                        React.createElement("tr", null, 
                            React.createElement("td", null, React.createElement("b", null, "Language")), 
                            React.createElement("td", null)
                        )
                    )
                )
            )
        );
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
    handleClick: function () {
        this.props.onStorySubmit();
    },
    render: function () {
        var btn_text = this.props.submitting ? 'Submitting...' : 'Submit';
        return (
            React.createElement("input", {type: "button", className: "btn btn-primary", onClick: this.handleClick, disabled: this.props.submitting, value: btn_text})
        );
    }
});

/**
 * Story Writing Form
 */
var StoryForm = React.createClass({displayName: "StoryForm",
    render: function () {
        return (
            React.createElement("form", null, 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("textarea", {id: "story-text", disabled: this.props.submitting, name: "story-text", rows: "4", className: "form-control"})
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement(StoryFormButton, React.__spread({},  this.props))
                )
            )
        );
    }
});


var CaptureWorkerId = React.createClass({displayName: "CaptureWorkerId",
    handleClick: function () {
        this.props.captureWorkerId();
    },

    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("label", {htmlFor: "worker_id"}, "Worker ID:"), 
                React.createElement("input", {id: "worker-id", type: "text", name: "worker_id", className: "form-control"}), 
                React.createElement("input", {id: "worker-id-button", type: "button", className: "btn btn-primary", value: "Submit", onClick: this.handleClick})
            )
        );
    }
});

var EthicalStatement = React.createClass({displayName: "EthicalStatement",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("p", null, "This experiment is being conducted by the University of Prince Edward Island's Human-Computer Interaction Lab."), 

                React.createElement("p", null, 
                    "We are studying the performance of workers on crowd sourcing services. By submitting your Worker ID" + ' ' +
                    "you are giving consent to gather information on your performance in the following tasks."
                ), 

                React.createElement("ol", null, 
                    React.createElement("li", null, " By submitting your Worker ID you are giving consent for the UPEI HCI Lab to collect information on" + ' ' +
                        "your performance in the following tasks."), 
                    React.createElement("li", null, " All information gathered is, and always will be, anonymous."), 
                    React.createElement("li", null, " The information gathered will only be used for research purposes."), 
                    React.createElement("li", null, " By submitting this form you consent to let the UPEI HCI Lab use this information for research purposes."), 
                    React.createElement("li", null, " If at any time you wish to revoke your consent, please email ncphillips@upei.ca and all your data will be removed.")
                )

            )
        );
    }
});

/**
 * The main app container.
 */
var StoryTime = React.createClass({displayName: "StoryTime",
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
                React.createElement("div", null, 
                    React.createElement("h2", null, "Story: ", this.state.story_num), 
                    React.createElement("p", null, 
                        "You will be shown a series of pictures. For each picture, write a short story about that" + ' ' +
                        "picture. The story you write only needs to be a couple sentences long."
                    ), 
                    React.createElement(StoryMetrics, {metrics: this.state.metrics}), 
                    React.createElement(StoryImage, {img_url: this.state.img_url}), 
                    React.createElement(StoryForm, {onStorySubmit: this.handleStorySubmit, submitting: this.state.submitting})
                )
            );
        }
        else {
            return  (
                React.createElement("div", null, 
                    React.createElement(EthicalStatement, null), 
                    React.createElement(CaptureWorkerId, {captureWorkerId: this.captureWorkerId})
                )
            )

        }

    }
});


React.render(React.createElement(StoryTime, null), document.getElementById('story-time'));


