var CodeDisplay = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Thank you for taking part in this UPEI HCI Lab experiment!</h1>
                <p>
                    Please copy the following code and paste it into the textbox in the job you came from.
                </p>
                <div className="well">{this.props.code}</div>
            </div>
        );
    }
});