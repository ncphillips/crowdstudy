var BarChart = React.createClass({
    getDefaultProps: function () {
        return {
            width: 200,
            height: 200,
            data: [],
        }
    },
    componentDidMount: function () {
        this.renderChart();
    },
    componentDidUpdate: function () {
        this.renderChart();
    },
    renderChart: function () {
        d3.select('.chart').selectAll('*').remove();
        var data = this.props.data;
        var height = this.props.height;
        var width = this.props.width;
        var margin = {top: 20, right: 30, bottom: 30, left: 40};

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var chart = d3.select(".chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function(d) { return d.name; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);

        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        chart.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        chart.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.name); })
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            .attr("width", x.rangeBand());


    },
    render: function () {
        return (
            <svg className="chart"></svg>
        );

    }
});

function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}