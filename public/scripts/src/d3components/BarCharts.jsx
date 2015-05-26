var D3Component = React.createClass({
    getDefaultProps: function () {
        return {
            id: '',
            d3: function () {
                console.log('Error: Failed to provide a `d3` function to D3 component.');
            }
        };
    },
    render: function () {
        return (<svg id={this.props.id}></svg>)
    },

    componentDidMount: function () {
     this.props.d3();
    },

    componentDidUpdate: function () {
        this.props.d3();
    }
});

var BarChart_OX_LY = React.createClass({
    getDefaultProps: function () {
        return {
            id: 'barchart',
            width: 200,
            height: 200,
            data: []
        }
    },
    /**
     * Renders the SVG chart using the D3 library.
     */
    d3: function () {
        var identifier = "#" + this.props.id;
        d3.select(identifier).selectAll('*').remove();
        var data = this.props.data;
        var height = this.props.height;
        var width = this.props.width;
        var margin = {top: 20, right: 30, bottom: 30, left: 40};

        // Scales are functions that map a domain to a range.
        // Ordinal scales have a discrete domain (e.g. set of names or categories),
        // Quantitative scales have a continuous domain (e.g. real numbers).

        // Here we are creating an ordinal scale with an empty domain and range for
        // the x dimension. At this point it would always return `undefined` when
        // given a value.
        var x = d3.scale.ordinal()

            // For the `x` scale, the domain elements are the `names` of each value
            // passed in.
            .domain(data.map(function (d) { return d.name; }))

            // This creates bands ( the bars for the bar chart ). These bands will have
            // a .1 (unit?) space between them, and will be spread out over a range
            // of 0 to `width`.
            .rangeRoundBands([0, width], .1);


        // Here we are creating a linear scale. The default linear scale is the
        // identify function for numbers.
        var y = d3.scale.linear()

            // The domain for `y` scale is 0 to the max data value passed in.
            .domain([0, d3.max(data, function(d) { return d.value; })])

            .range([height, 0]);

        // The svg.axis object takes care of drawing the axis.
        // Create the initial axis,
        var xAxis = d3.svg.axis()

            // assign the it to the `x` scale.
            .scale(x)

            // tell it where to be rendered. E.g. top, bottom, left, right.
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");


        // We're selecting all elements on the page with the `chart` class. It would be better
        // to make an `id` seletion, and have that `id` be passed in as a parameter to
        // this react component.
        var chart = d3.select(identifier)

            // Assigning the `width` and `height` of the chart.
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

            // This appends a `g` element to the chart. `g` is the svg group element.
            .append("g")

            // Sets the `transform` attribute, which translates (moves) the chart
            // to the right and down, based on the margins.
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Here, we create a new group.
        chart.append("g")
            .attr("class", "x axis")

            // Push it to the bottom of the graph by translating down.
            .attr("transform", "translate(0," + height + ")")

            .call(xAxis);

        // Creating another group in the chart svg for teh y axis.
        // Doesn't need to be translated because it's all the way to
        // the left and it starts at the top.
        chart.append("g")

            .attr("class", "y axis")

            .call(yAxis);

        // Select all the nodes with the `bar` class.
        var bar_group = chart.selectAll(".bar-group")

            // Join the selection to the data.
            .data(data)

            // ???
            .enter()

            .append("g")

            .attr("class", "bar-group");

            // The svg x attribute is used to place a node with referenece to an x axis.
            // This value is being set by passing the name of the value into the `x` scale.


        bar_group.append("rect")

            // Adds the bar class to each `rect`.
            .attr("class", "bar")

            .attr("x", function (d) {
                return x(d.name);
            })

            // As with the svg y attribute, but for the y scale/axis.
            .attr("y", function (d) {
                return y(d.value);
            })

            // Sets the height of the bar.
            .attr("height", function (d) {
                return height - y(d.value);
            })

            // Setting the width of the bar using x.rangeBand(), which returns
            // the width of bands on the range.
            .attr("width", x.rangeBand());

        bar_group.append("text")
            .attr("x", function (d) { return x(d.name) + (x.rangeBand()/2) - 10; })
            .attr("y", function (d) { return y(d.value) - 10; })
            .attr("dy", ".35em")
            .text(function (d) {
                return d.value;
            });


    },
    render: function () {
        return (
            <D3Component id={this.props.id} d3={this.d3}></D3Component>
        );

    }
});

function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}


module.exports.OX_LY = BarChart_OX_LY;