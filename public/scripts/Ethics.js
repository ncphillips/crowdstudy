var EthicalStatement = React.createClass({displayName: "EthicalStatement",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("p", null, "This experiment is being conducted by the University of Prince Edward Island's Human-Computer Interaction Lab."), 
                React.createElement("p", null, "We are studying the performance of workers on crowd sourcing services."), 
                React.createElement("p", null, "Before submitting your Worker ID, please read the following:"), 

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