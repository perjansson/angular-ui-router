/** @jsx React.DOM */
angular
  .module('personApp')
  .value("PersonTable", React.createClass({
    propTypes: {
      persons: React.PropTypes.object.isRequired
    },

    render: function() {
      var colDefs = ['Name', 'Phone', 'Key', 'Phone', 'Key', 'Phone', 'Key', 'Name'];

      var cols = colDefs.map(function(col, i) {
        return React.DOM.th({
          key: i
        }, col);
      });

      var header = React.DOM.thead(null, React.DOM.tr({
        key: 'header'
      }, cols));

      var body = React.DOM.tbody(null, this.props.persons.map(function(person, i) {
          var cells = [];
          _(8).times(function(n) {
            if (n == 0 || n == 7) {
              cells.push(React.DOM.td(null, React.DOM.a(null, person.name)));
            } else if (n == 1 || n == 3 || n == 5) {
              cells.push(React.DOM.td(null, person.phone));
            } else if (n == 2 || n == 4 || n == 6) {
              cells.push(React.DOM.td(null, person.key));
            }
          })
          return React.DOM.tr({
            key: i
          }, cells);
      }));

      return React.DOM.table({key:'body', className:'table table-striped'}, [header, body]);
    }
  }));

angular
  .module('personApp')
  .directive('personTable', function(reactDirective) {
    return reactDirective('PersonTable');
  });
