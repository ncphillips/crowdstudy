var CodeDisplay = React.createClass({displayName: "CodeDisplay",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, "Thank you for taking part in this UPEI HCI Lab experiment!"), 
                React.createElement("p", null, 
                    "Please copy the following code and paste it into the textbox in the job you came from."
                ), 
                React.createElement("div", {className: "well"}, this.props.code)
            )
        );
    }
});