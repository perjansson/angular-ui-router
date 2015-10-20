angular
  .module('personApp')
  .value("PersonTable", React.createClass({

    propTypes: {
      persons: React.PropTypes.object.isRequired,
      callback: React.PropTypes.object.isRequired
    },

    handleNameClick: function(person, e) {
      e.preventDefault();
      this.props.callback(person);
    },

    render: function() {
      return (
        <table className="table table-striped">
          <thead>
            <th>Name</th>
            <th>Key</th>
            <th>Phone</th>
            <th>Key</th>
            <th>Phone</th>
            <th>Key</th>
            <th>Phone</th>
            <th>Name</th>
          </thead>
          {this.renderPersonRows()}
        </table>
      )
    },

    renderPersonRows: function() {
      var callback = this.props.callback;

      var that = this;
  		return _.map(this.props.persons, function(person) {
  			return (
  				<tr>
            <td><a onClick={that.handleNameClick.bind(that, person)}>{person.name}</a></td>
            <td>{person.key}</td>
            <td>{person.phone}</td>
            <td>{person.key}</td>
            <td>{person.phone}</td>
            <td>{person.key}</td>
            <td>{person.phone}</td>
            <td>{person.name}</td>
          </tr>
  			);
  		});
  	}
  }));

angular
  .module('personApp')
  .directive('personTable', function(reactDirective) {
    return reactDirective('PersonTable');
  });
