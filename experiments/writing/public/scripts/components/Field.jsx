'use strict';

var Mole = React.createClass({
  render: function () {
    var img_src = "mole_" + this.state.img + ".png";

    return <img src={img_src} style={{position: "absolute", top: 15, left: 40, width: "120px", height: "120px", "z-index": 2}}/>
  },
  getDefaultProps: function () {
    return {
      was_hit: false
    };
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
      if (this.props.was_hit) {
        this.wince();
      }
      else {
        setTimeout(this.blink, 800);
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
    var _this = this;

    three();

    function three() {
      _this.setState({img: 3}, setTimeout.bind(null, four, 50));
    }

    function four() {
      _this.setState({img: 4}, setTimeout.bind(null, five, 50));
    }
    function five() {
      _this.setState({img: 5}, setTimeout.bind(null, six, 50));
    }
    function six() {
      _this.setState({img: 6}, setTimeout.bind(null, _this.props.callback, 100));
    }
  }
});

var Patch = React.createClass({
  render: function () {
    var child = null;
    var callback = this.props.miss;
    var className = 'empty-patch';

    if (this.props.has_mole) {
      child = <Mole was_hit={this.state.hit} callback={this.props.hit.bind(null, this.state.event)} />;
      callback = this.clickedyClack;
      className = 'mole-patch';
    }

    return (
      <td className={className} onClick={callback}>
        <div style={{position: "relative", width: "200px", height: "200px"}}>
          <img  src="background.png" style={{position: "absolute", top: 0, left: 0, width: "200px", height: "200px", "z-index": 0}}/>
          <img src="upper.png" style={{position: "absolute", top: 0, left: 0, width: "200px", height: "100px", "z-index": 1}}/>
          {child}
          <img src="lower.png" style={{position: "absolute", top: 100, left: 0, width: "200px", height: "100px", "z-index": 4}}/>
        </div>
      </td>
    );
  },
  getInitialState: function () {
    return {
      hit: false,
      event: {}
    };
  },
  clickedyClack: function (e) {
    this.setState({hit:true, event: e});
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
        <table>
        {rows}
        </table>
      </div>
    );
  }
});

module.exports = Field;
