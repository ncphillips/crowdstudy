'use strict';

var Mole = React.createClass({displayName: "Mole",
    render: function () {
        return ( React.createElement("img", {src: "mole_1.jpg", width: "100", height: "100"}) );
    }
});

var Hill = React.createClass({displayName: "Hill",
    render: function () {
        return ( React.createElement("img", {src: "hill.jpg", width: "100", height: "100"}) );
    }
});

var GridCell = React.createClass({displayName: "GridCell",
    render: function () {
        var child = this.props.has_mole ? (React.createElement(Mole, null)): React.createElement(Hill, null);
        var callback = this.props.has_mole ? this.props.hitCallback: this.props.missCallback;
        return (
            React.createElement("td", {onClick: callback}, child)
        );
    }
});

var GridRow = React.createClass({displayName: "GridRow",
    render: function () {
        var cols = [];
        for (let i=1; i <= this.props.dimensions[1]; i++){
            let has_mole = false;
            if (this.props.col === i) has_mole = true;
            cols.push(React.createElement(GridCell, {key: i, has_mole: has_mole, hitCallback: this.props.hitCallback, missCallback: this.props.missCallback}));
        }

        return ( React.createElement("tr", null, " ", cols, " ") );
    }
});

var Grid = React.createClass({displayName: "Grid",
    render: function () {
        var rows = [];
        for (let i=1; i <= this.props.dimensions[0]; i++){
            let col = 0;
            if (this.props.row === i) col = this.props.col;
            rows.push(React.createElement(GridRow, {dimensions: this.props.dimensions, key: i, col: col, hitCallback: this.props.hitCallback, missCallback: this.props.missCallback}))
        }
        return ( React.createElement("div", null, " ", React.createElement("table", {className: "table table-bordered"}, " ", rows, " "), " ") );
    }
});

var PerformanceRow = React.createClass({displayName: "PerformanceRow",
    render: function () {
        var hit_text = this.props.data.hit ? 'HIT!': 'miss...';
        var time_diff = this.props.data.time.end - this.props.data.time.start;

        return (
            React.createElement("tr", null, 
                React.createElement("td", null, this.props.data.time.start.getTime()), 
                React.createElement("td", null, this.props.data.time.end.getTime()), 
                React.createElement("td", null, time_diff), 
                React.createElement("td", null, hit_text), 
                React.createElement("td", null, this.props.data.waittime)
            )
        )
    }
});

var Performance = React.createClass({displayName: "Performance",
    render: function () {
        var rows = this.props.data.map(function (d, i) {
            return React.createElement(PerformanceRow, {key: i, data: d})

        });

        return (
            React.createElement("div", null, 
                React.createElement("table", {className: "table table-striped"}, 
                    React.createElement("thead", null, React.createElement("tr", null, 
                        React.createElement("td", null, "Start Time"), 
                        React.createElement("td", null, "End Time"), 
                        React.createElement("td", null, "Time Diff (ms)"), 
                        React.createElement("td", null, "Hit/Miss"), 
                        React.createElement("td", null, "Wait ")
                    )), 
                    React.createElement("tbody", null, 
                        rows
                    )
                )
            )
        )
    }

});

var WackPerformance = React.createClass({displayName: "WackPerformance",
    render: function () {
        var data = this.props.performance.map(function (p) {
           return p.time.start - p.time.end;
        });
        return React.createElement(BarChart_OX_LY, {data: data})
    }
});

var WackAMoleApp = React.createClass({displayName: "WackAMoleApp",
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
            React.createElement("div", null, 
                React.createElement("div", null, 
                    React.createElement("h1", null, "Wack a Mole!"), 
                    React.createElement(WackPerformance, React.__spread({},  this.state)), 
                    React.createElement("table", {className: "table"}, 
                        React.createElement("tr", null, " ", React.createElement("td", null, "Whack Count: ", this.state.hit_count), " ", React.createElement("td", null, "Miss Count: ", this.state.miss_count), " "), 
                        React.createElement("tr", null, " ", React.createElement("td", null, "Screen Height: ", this.state.screen.height), " ", React.createElement("td", null, "Screen Width: ", this.state.screen.width), " ")
                    )
                ), 

                React.createElement(Grid, React.__spread({},  this.state.mole, {dimensions: dimensions, hitCallback: this.whackMole, missCallback: this.missMole})), 
                React.createElement(Performance, {data: this.state.performance})
            )
        );
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var WackExperiment = React.createClass({displayName: "WackExperiment",
  render: function () {
    return ( React.createElement(CrowdExperiment, null, " ", React.createElement(WackAMoleApp, null, " ")) );
  }
});

React.render(React.createElement(WackExperiment, null), document.getElementById('wack-a-mole'));