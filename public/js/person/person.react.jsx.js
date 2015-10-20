"use strict";

angular.module('personApp').value("PersonTable", React.createClass({

  propTypes: {
    persons: React.PropTypes.object.isRequired,
    callback: React.PropTypes.object.isRequired
  },

  handleNameClick: function handleNameClick(person, e) {
    e.preventDefault();
    this.props.callback(person);
  },

  render: function render() {
    return React.createElement(
      "table",
      { className: "table table-striped" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "th",
          null,
          "Name"
        ),
        React.createElement(
          "th",
          null,
          "Key"
        ),
        React.createElement(
          "th",
          null,
          "Phone"
        ),
        React.createElement(
          "th",
          null,
          "Key"
        ),
        React.createElement(
          "th",
          null,
          "Phone"
        ),
        React.createElement(
          "th",
          null,
          "Key"
        ),
        React.createElement(
          "th",
          null,
          "Phone"
        ),
        React.createElement(
          "th",
          null,
          "Name"
        )
      ),
      this.renderPersonRows()
    );
  },

  renderPersonRows: function renderPersonRows() {
    var callback = this.props.callback;

    var that = this;
    return _.map(this.props.persons, function (person) {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          React.createElement(
            "a",
            { onClick: that.handleNameClick.bind(that, person) },
            person.name
          )
        ),
        React.createElement(
          "td",
          null,
          person.key
        ),
        React.createElement(
          "td",
          null,
          person.phone
        ),
        React.createElement(
          "td",
          null,
          person.key
        ),
        React.createElement(
          "td",
          null,
          person.phone
        ),
        React.createElement(
          "td",
          null,
          person.key
        ),
        React.createElement(
          "td",
          null,
          person.phone
        ),
        React.createElement(
          "td",
          null,
          person.name
        )
      );
    });
  }
}));

angular.module('personApp').directive('personTable', function (reactDirective) {
  return reactDirective('PersonTable');
});