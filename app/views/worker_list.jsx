'use strict';
var React = require('react');
var DefaultLayout = require('./layouts/default');

var WorkerTable = React.createClass({
   render: function () {
       var worker_nodes = this.props.workers.map(function (worker) {
           var num_experiments = worker.experiments ? worker.experiments.length : 0;
           return (
               <tr>
                   <td>{worker.platform}</td>
                   <td>{worker.id}</td>
                   <td>{num_experiments}</td>
               </tr>
           );
       });

       return (
           <table className="table table-hover">
               <thead>
                   <th>Platform</th>
                   <th>ID</th>
                   <th>&#35; Experiments</th>
               </thead>
               <tbody>
                   {worker_nodes}
               </tbody>
           </table>
       );
   }
});

module.exports = React.createClass({
    render: function () {
        return (
            <DefaultLayout title="Workers">
                <h1>UPEI HCI Labs</h1>
                <h2>Workers</h2>
                <WorkerTable {...this.props}></WorkerTable>
            </DefaultLayout>
        )
    }
});


