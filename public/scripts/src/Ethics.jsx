var EthicalStatement = React.createClass({
  render: function () {
    return (
      <iframe src="/consent" width="675" height={this.state.height}/>
    );
  },
  getInitialState: function () {
    return { height: window.innerHeight - 150 }
  },
  resetHeight: function () {
    this.setState({height: window.innerHeight - 150});
  },
  componentDidMount: function () {
    window.onresize = this.resetHeight;
  }
});

module.exports = EthicalStatement;