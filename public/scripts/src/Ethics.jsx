'use strict';

//var React = require('react');

var EthicalStatement = React.createClass({
  render: function () {
    return  <iframe src="/consent" width="675" height={this.state.height}/>;
  },
  getInitialState: function () {
    return { height: this.iframeHeight() }
  },
  componentDidMount: function () {
    window.onresize = this.resetHeight;
  },
  resetHeight: function () {
    this.setState({height: this.iframeHeight()});
  },
  iframeHeight: function () {
    return window.innerHeight - 150;
  }
});

module.exports = EthicalStatement;