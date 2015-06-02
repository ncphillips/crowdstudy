'use strict';

var Mole = React.createClass({
  render: function () {
    var img_src = "mole_" + this.state.img + ".png";

    return <img src={img_src} width="100" height="100"></img>;
  },
  getInitialState: function () {
    return {
      img: 0
    };
  },
  componentDidMount: function () {
    this.openEyes();
  },
  openEyes: function () {
    this.setState({img: 0}, function () {
      if (this.state.hit) {
        this.wince();
      }
      else {
        setTimeout(this.blink, 1000);
      }
    });
  },
  blink: function () {
    var _this = this;

    one();

    function one(){
      _this.setState({img: 1}, setTimeout.bind(null, two, 50));
    }

    function two() {
      _this.setState({img: 2}, setTimeout.bind(null, _this.openEyes, 100));
    }
  },
  wince: function () {
    console.log("WINCING IN PAIN@");

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
      child = <Mole was_hit={this.state.hit} callback={this.props.callback} />;
      callback = this.hit;
      className = 'mole-patch';
    }

    return <td className={className} onClick={callback}>{child}</td>;
  },
  getInitialState: function () {
    return { hit: false };
  },
  hit: function () {
    this.setState({hit:true});
  }
});

var Row = React.createClass({
  render: function () {
    var patches= [];
    for (var i=1; i <= this.props.dimensions[1]; i++){
      var has_mole = this.props.mole_patch === i;
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
 *    2. row = Numbe
 *    3. patch = Number
 *    4. hit = func
 *    5. miss = func
 */
var Field = React.createClass({
  render: function () {
    var rows = [];

    for (var i=1; i <= this.props.dimensions[0]; i++){
      var mole_patch = 0;
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
