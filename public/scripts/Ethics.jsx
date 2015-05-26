var EthicalStatement = React.createClass({
    render: function () {
        return (
            <div>
                <p>This experiment is being conducted by the University of Prince Edward Island's Human-Computer Interaction Lab.</p>
                <p>We are studying the performance of workers on crowd sourcing services.</p>
                <p>Before submitting your Worker ID, please read the following:</p>

                <ol>
                    <li> By submitting your Worker ID you are giving consent for the UPEI HCI Lab to collect information on
                        your performance in the following tasks.</li>
                    <li> All information gathered is, and always will be, anonymous.</li>
                    <li> The information gathered will only be used for research purposes.</li>
                    <li> By submitting this form you consent to let the UPEI HCI Lab use this information for research purposes.</li>
                    <li> If at any time you wish to revoke your consent, please email ncphillips@upei.ca and all your data will be removed.</li>
                </ol>

            </div>
        );
    }
});

module.exports = EthicalStatement;