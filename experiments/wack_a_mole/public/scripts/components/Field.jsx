'use strict';

var Mole = React.createClass({
  render: function () {
    return <img src="mole_1.jpg" width="100" height="100"></img>;
  }
});

var Empty = React.createClass({
  render: function () {
    return <img src="hill.jpg" width="100" height="100"></img>;
  }
});

var Patch = React.createClass({
  render: function () {
    var child = <Empty/>;
    var callback = this.props.miss;
    var className = 'empty-patch';
    if (this.props.has_mole) {
      child = <Mole/>;
      callback = this.props.hit;
      className = 'mole-patch';
    }
    return <td className={className} onClick={callback}>{child}</td>;
  }
});

var Row = React.createClass({
  render: function () {
    var patches= [];
    for (let i=1; i <= this.props.dimensions[1]; i++){
      let has_mole = this.props.mole_patch === i;
      patches.push(
        <Patch key={i} has_mole={has_mole} hit={this.props.hit} miss={this.props.miss}></Patch>
      );
    }

    return <tr> {patches} </tr>;
  }
});

/**
 * A Field where a mole lives.
 *
 * Props:
 *    1. dimensions = [Number, Number]
 *    2. row = Number
 *    3. patch = Number
 *    4. hit = func
 *    5. miss = func
 */
var Field = React.createClass({
  render: function () {
    var rows = [];

    for (let i=1; i <= this.props.dimensions[0]; i++){
      let mole_patch = 0;
      if (this.props.row === i) mole_patch = this.props.patch;
      rows.push(
        <Row dimensions={this.props.dimensions}
          key={i} mole_patch={mole_patch} hit={this.props.hit}
          miss={this.props.miss}></Row>)
    }
    return (
      <div>
        <table className="table table-bordered">
        {rows}
        </table>
      </div>
    );
  }
});

module.exports = Field;
