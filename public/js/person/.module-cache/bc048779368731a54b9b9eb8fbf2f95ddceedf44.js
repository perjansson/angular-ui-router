/** @jsx React.DOM */
var PersonListComponent = React.createClass({displayName: "PersonListComponent",
  propTypes: {
    fname : React.PropTypes.string.isRequired,
    lname : React.PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("span", null, "Hello ", this.props.fname, " ", this.props.lname, "!!!");
  }
})

angular
  .module('personApp')
  .value('PersonListComponent', PersonListComponent);
