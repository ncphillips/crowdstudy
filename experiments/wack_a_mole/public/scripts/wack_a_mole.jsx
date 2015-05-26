'use strict';
var CrowdExperiment = require('CrowdExperiment');

var Mole = React.createClass({
    render: function () {
        return ( <img src="mole_1.jpg" width="100" height="100"></img> );
    }
});

var Hill = React.createClass({
    render: function () {
        return ( <img src="hill.jpg" width="100" height="100"></img> );
    }
});

var GridCell = React.createClass({
    render: function () {
        var child = this.props.has_mole ? (<Mole></Mole>): <Hill></Hill>;
        var callback = this.props.has_mole ? this.props.hitCallback: this.props.missCallback;
        return (
            <td onClick={callback}>{child}</td>
        );
    }
});

var GridRow = React.createClass({
    render: function () {
        var cols = [];
        for (let i=1; i <= this.props.dimensions[1]; i++){
            let has_mole = false;
            if (this.props.col === i) has_mole = true;
            cols.push(<GridCell key={i} has_mole={has_mole} hitCallback={this.props.hitCallback} missCallback={this.props.missCallback}></GridCell>);
        }

        return ( <tr> {cols} </tr> );
    }
});

var Grid = React.createClass({
    render: function () {
        var rows = [];
        for (let i=1; i <= this.props.dimensions[0]; i++){
            let col = 0;
            if (this.props.row === i) col = this.props.col;
            rows.push(<GridRow dimensions={this.props.dimensions} key={i} col={col} hitCallback={this.props.hitCallback} missCallback={this.props.missCallback}></GridRow>)
        }
        return ( <div> <table className="table table-bordered"> {rows} </table> </div> );
    }
});

var PerformanceRow = React.createClass({
    render: function () {
        var hit_text = this.props.data.hit ? 'HIT!': 'miss...';
        var time_diff = this.props.data.time.end - this.props.data.time.start;

        return (
            <tr>
                <td>{this.props.data.time.start.getTime()}</td>
                <td>{this.props.data.time.end.getTime()}</td>
                <td>{time_diff}</td>
                <td>{hit_text}</td>
                <td>{this.props.data.waittime}</td>
            </tr>
        )
    }
});

var Performance = React.createClass({
    render: function () {
        var rows = this.props.data.map(function (d, i) {
            return <PerformanceRow key={i} data={d}></PerformanceRow>

        });

        return (
            <div>
                <table className="table table-striped">
                    <thead><tr>
                        <td>Start Time</td>
                        <td>End Time</td>
                        <td>Time Diff (ms)</td>
                        <td>Hit/Miss</td>
                        <td>Wait </td>
                    </tr></thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }

});

var WackAMoleApp = React.createClass({
    getInitialState: function () {
        return {
            screen: {
                height: window.screen.availHeight,
                width: window.screen.availWidth
            },
            timeout_id: '',
            hit_count: 0,
            miss_count: 0,
            performance: [],
            time_start: null,
            mole: {
                underground: true,
                row: 0,
                col: 0
            }
        };
    },

    /**
     * Move the mole above ground.
     */
    componentDidMount: function () {
        this.moveMole();
    },

    /**
     * Called when the mole is going to move.
     * @param hit
     */
    moveMole: function (hit) {
        // If he was under ground, he moves above ground, and vice versa.
        var underground = ! (this.state.mole.underground);
        var minus = this.state.hit_count >= 8 ? 7.5: this.state.hit_count;
        var low = (8 - minus) * 1000;
        var high = (10 - minus) * 1000;
        var waittime = getRandomInt(low, high);
        var p = this.state.performance;

        if (underground) {
            p.push({
                hit: hit || false,
                waittime: waittime,
                time: {
                    start: this.state.start_time,
                    end: new Date()
                }
            });
        }

        if (this.state.timeout_id)
            clearTimeout(this.state.timeout_id);
        console.log("Waiting");
        var t_id = setTimeout(this.moveMole, waittime );

        this.setState({
            start_time: new Date(),
            performance: p,
            timeout_id: t_id,
            mole: {
                underground: underground,
                row: underground ? 0: getRandomInt(1,3),
                col: underground ? 0: getRandomInt(1,3)
            }
        });
    },

    /**
     * Called when the user whacks the mole.
     */
    whackMole: function () {
        this.setState({hit_count: this.state.hit_count + 1});
        this.moveMole(true);
    },

    /**
     * Called when the user whacks the mole hill and not the mole.
     */
    missMole: function () {
        this.setState({miss_count: this.state.miss_count + 1});
    },

    /**
     * Renders App
     * @returns {XML}
     */
    render: function () {
        var dimensions = [5, 5];
        return (
            <div>
                <div>
                    <h1>Wack a Mole!</h1>
                    <table className="table">
                        <tr> <td>Whack Count: {this.state.hit_count}</td> <td>Miss Count: {this.state.miss_count}</td> </tr>
                        <tr> <td>Screen Height: {this.state.screen.height}</td> <td>Screen Width: {this.state.screen.width}</td> </tr>
                    </table>
                </div>

                <Grid {...this.state.mole} dimensions={dimensions} hitCallback={this.whackMole} missCallback={this.missMole}></Grid>
                <Performance data={this.state.performance}></Performance>
            </div>
        );
    }
});

var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var WackExperiment = React.createClass({
  render: function () {
    console.log("Wacking moles.");
    return (
      <CrowdExperiment experiment_name="wack_a_mole"o>
        <WackAMoleApp/>
      </CrowdExperiment>
    );
  }
});

React.render(<WackExperiment/>, document.getElementById('wack-a-mole'));

