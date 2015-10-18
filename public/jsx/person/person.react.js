/** @jsx React.DOM */
angular
  .module('personApp')
  .value("MyTable", React.createClass({

    propTypes: {
      table: React.PropTypes.object.isRequired
    },

    getDefaultProps: function() {
      return {
        table: {
          rows: [],
          cols: []
        }
      };
    },

    render: function() {
      var cols = this.props.table.cols.map(function(col, i) {
        return React.DOM.th({
          key: i
        }, col);
      });
      var header = React.DOM.thead(null, React.DOM.tr({
        key: 'header'
      }, cols));

      var body = React.DOM.tbody(null, this.props.table.rows.map(function(row, i) {
        return React.DOM.tr({
          key: i
        }, row.map(function(cell, j) {
          return React.DOM.td({
            key: j
          }, cell);
        }));
      }));

      return React.DOM.table({
        key: 'body',
        className: 'pure-table'
      }, [header, body]);
    }
  }));

angular
  .module('personApp')
  .directive('myTable', function(reactDirective) {
    return reactDirective('MyTable');
  });
