var Component = (function () {
  //TODO
  "use strict";

  var TableHead = React.createClass({
    render: function () {
      this.props.strings.labels.cols.map(function (col) {
        return (<td>{col.name}</td>);
      });

    },
    getDefaultProps: function () {
      return {
        strings: {
          labels: {
            cols: []
          }
        }
      };
    }
  });

  return React.createClass({
    render: function () {

      return (
        <div>
          <h2>Feedback</h2>
          <table>

          </table>
        </div>
      );
    },
    getDefaultProps: function () {
      return {
        url: null,
        strings: {
          labels: {
            cols: [{name: '', path: ''}]
          },
        }
      }
    }
  });
})();