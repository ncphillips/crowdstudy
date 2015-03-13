var React = require('react');

var ExperimentItem = React.createClass({
   render: function () {
       // @todo Add a "Unique Key" for each element in the array.
       return (
           <li><a href={this.props.href}>{this.props.name}</a></li>
       )
   }
});

var ExperimentList = React.createClass({
    render: function() {
        var experiment_nodes = global.experiments.map(function (name) {
            var url = '/' + name;
            return (
                <ExperimentItem href={url} name={name}/>
            );
        });

        return (
          <ul className={this.props.className} role={this.props.role}>
              {experiment_nodes}
          </ul>
        );
    }
});

module.exports = ExperimentList;

