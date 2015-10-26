(function() {
  'use strict';

  angular.module('personApp', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    //'gc.fastRepeat',
    'react',
    'ngHamburger'
  ]);

})();

(function() {
  'use strict';

  angular
    .module('personApp')
    .config(['$stateProvider', '$urlRouterProvider', routeConfig]);

  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('persons-ng-repeat', {
        url: '/persons-ng-repeat',
        resolve: {
          persons: ['personsService', function(personsService) {
            return [];
          }],
          person: function() {
            return {};
          },
          filter: function() {
            return "";
          }
        },
        templateUrl: 'partials/persons-ng-repeat.html',
        controller: 'PersonsController as vm'
      })

    .state('persons-fast-repeat', {
      url: '/persons-fast-repeat',
      resolve: {
        persons: ['personsService', function(personsService) {
          return personsService.getPersons();
        }],
        person: function() {
          return {};
        },
        filter: function() {
          return "";
        }
      },
      templateUrl: 'partials/persons-fast-repeat.html',
      controller: 'PersonsController as vm'
    })

    .state('persons-react', {
      url: '/persons-react',
      resolve: {
        persons: ['personsService', function(personsService) {
          return personsService.getPersons();
        }],
        person: function() {
          return {};
        },
        filter: function() {
          return "";
        }
      },
      templateUrl: 'partials/persons-react.html',
      controller: 'PersonsController as vm'
    })

    .state('search', {
      url: '/persons/:query',
      resolve: {
        persons: ['$stateParams', 'personsService', function($stateParams, personsService) {
          return personsService.searchPersons($stateParams.query);
        }],
        person: function() {
          return {};
        },
        filter: ['$stateParams', function($stateParams) {
          return $stateParams.query;
        }]
      },
      templateUrl: 'partials/persons.html',
      controller: 'PersonsController as vm'
    })

    .state('person', {
      url: '/person/:key',
      resolve: {
        persons: function() {
          return [];
        },
        person: ['$stateParams', 'personsService', function($stateParams, personsService) {
          return personsService.getPerson($stateParams.key);
        }],
        filter: function() {
          return "";
        }
      },
      templateUrl: 'partials/person.html',
      controller: 'PersonsController as vm'
    })

    .state('editperson', {
      url: '/person/:key/edit',
      resolve: {
        persons: function() {
          return [];
        },
        person: ['$stateParams', 'personsService', function($stateParams, personsService) {
          return personsService.getPerson($stateParams.key);
        }],
        filter: function() {
          return "";
        }
      },
      templateUrl: 'partials/editperson.html',
      controller: 'PersonsController as vm'
    })

    .state('createperson', {
      url: '/persons',
      resolve: {
        persons: function() {
          return [];
        },
        person: function() {
          return {};
        },
        filter: function() {
          return "";
        }
      },
      templateUrl: 'partials/editperson.html',
      controller: 'PersonsController as vm'
    });

    $urlRouterProvider.otherwise('/persons');

  };

  angular
    .module('personApp')
    .run(function($state, $rootScope) {
      $rootScope.$on("$stateChangeError", console.log.bind(console));
    });

})();

(function() {
  'use strict';

  angular
    .module('personApp')
    .factory('Person', personFactory);

  function personFactory() {

    function Person(key, name, phone) {
      this.key = key;
      this.name = name;
      this.phone = phone;
    }

    Person.prototype = {
      getAllInfo : function() {
        return "Key: " + this.key + ", Name: " + this.name + ", Phone: " + this.phone;
      }
    };

    Person.createFromJsonResponse = function(response) {
      var json = (response.data !== undefined) ? response.data : response;
      if (angular.isArray(json)) {
        return json
          .map(Person.createFromJsonResponse)
          .filter(Boolean);
      }
      return new Person(json.key, json.name, json.phone);
    };

    return Person;

  };

})();

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
(function() {
  'use strict';

  angular
    .module('personApp')
    .controller('PersonsController', ['$state', '$interval', 'personsService', 'persons', 'person', 'filter', PersonsController]);

  function PersonsController($state, $interval, personsService, persons, person, filter) {
    var vm = this;

    vm.persons = persons;
    vm.person = person;
    vm.filter = filter;
    vm.personQuery = $state.params.query;
    vm.savePerson = savePerson;
    vm.searchPerson = searchPerson;
    vm.onClickPerson = onClickPerson;

    activate();

    //$interval(activate, 10000);

    function activate() {
      personsService.getPersons()
        .then(function(persons) {
          vm.persons = _.sortBy(persons, function(person) {
      			return person.name;
      		});
        });
    }

    function onClickPerson(person) {
      $state.go('person', { key:person.key });
    }

    function savePerson() {
      if (vm.person.key) {
        updatePerson(vm.person);
      } else {
        createPerson(vm.person);
      }
    };

    function updatePerson(person) {
      personsService.updatePerson(person)
        .then(function() {
          $state.go('persons');
        });
    }

    function createPerson(person) {
      personsService.createPerson(person)
        .then(function() {
          $state.go('persons');
        });
    }

    function searchPerson(query) {
      if (query.length) {
        return $state.go('persons');
      }

      $state.go('search', {
        query: query
      });
    };

  };

})();

(function() {
  'use strict';

  angular
    .module('personApp')
    .service('personsService', ['$http', '$q', 'Person', personsService]);

  function personsService($http, $q, Person) {

    var counter = 0;
    var fakePersons = [];

    function generateFakePersons() {
      fakePersons = [];
      _(100).times(function(n) {
        counter = counter + 1;
        fakePersons.push({
          key: counter,
          name: counter + " Person",
          phone: counter
        })
      })
      return fakePersons;
    }

    this.createPerson = function(person) {
      return $http.post('/persons', person);
    };

    this.updatePerson = function(person) {
      return $http.post('/person/' + person.key, person);
    };

    this.searchPersons = function(query) {
      return $http.get('/persons/' + query)
        .then(Person.createFromJsonResponse)
    };

    this.getPersons = function() {
      /*return $http.get('/persons')
          .then(Person.createFromJsonResponse)*/
      var deferred = $q.defer();
      deferred.resolve(generateFakePersons());
      return deferred.promise;
    };

    this.getPerson = function(key) {
      /*return $http.get('/person/' + key)
        .then(Person.createFromJsonResponse);*/
      var person = _.where(fakePersons, { key: parseInt(key) })[0];
      var deferred = $q.defer();
      deferred.resolve(person);
      return deferred.promise;
    };

  };

})();

angular.module("personApp").run(["$templateCache", function($templateCache) {$templateCache.put("partials/editperson.html","<div class=\"panel panel-default\"><div class=\"panel-heading\">Person #<span ng-bind=\"vm.person.key\"></span></div><div class=\"panel-body\"><div class=\"form-group\"><label for=\"name\">Name:</label> <input type=\"text\" class=\"form-control\" name=\"name\" ng-model=\"vm.person.name\"></div><div><label for=\"phone\">Phone:</label> <input type=\"text\" class=\"form-control\" name=\"phone\" ng-model=\"vm.person.phone\"></div><div class=\"form-group\"><div class=\"pull-right control-panel\"><button type=\"button\" class=\"btn btn-default\" ui-sref=\"persons\">Cancel</button> <button type=\"button\" class=\"btn btn-success\" ng-click=\"vm.savePerson()\">Save</button></div></div></div></div>");
$templateCache.put("partials/nav.html","<div class=\"sidenav persons-nav animated bounceInLeft\" ng-class=\"{open: hamburgerOpenState}\"><ul class=\"nav nav-pills nav-stacked\"><li role=\"presentation\" ui-sref-active=\"active\" ng-click=\"hamburgerOpenState = false\"><a ui-sref=\"persons-ng-repeat\">Ng-repeat</a></li><li role=\"presentation\" ui-sref-active=\"active\" ng-click=\"hamburgerOpenState = false\"><a ui-sref=\"persons-react\">React</a></li></ul></div>");
$templateCache.put("partials/person.html","<div class=\"panel panel-default\"><div class=\"panel-heading\">Person #<span ng-bind=\"vm.person.key\"></span></div><div class=\"panel-body\"><div><strong>Name:</strong> {{vm.person.name}}</div><div><strong>Phone:</strong> {{vm.person.phone}}</div><div class=\"well\" style=\"margin-top: 25px\"><i>All info in one go: {{vm.person.getAllInfo()}}</i></div><div class=\"pull-right control-panel\"><button type=\"button\" class=\"btn btn-default\" ui-sref=\"persons\">Back</button> <button type=\"button\" class=\"btn btn-danger\" ui-sref=\"editperson({key:vm.person.key})\">Edit</button></div></div></div>");
$templateCache.put("partials/persons-fast-repeat.html","<div class=\"person-form animated\" ng-class=\"{ \'up\': vm.filter }\"><form><div class=\"form-group\"><input type=\"text\" class=\"form-control input-lg\" placeholder=\"Filter persons\" ng-model=\"vm.filter\"></div></form><h1>Angular fast-repeat rendering {{vm.persons.length}} rows</h1><div><table class=\"table table-striped\"><thead><th>Name</th><th>Key</th><th>Phone</th><th>Key</th><th>Phone</th><th>Key</th><th>Phone</th><th>Name</th></thead><tr fast-repeat=\"person in vm.persons | filter: vm.filter\"><td><a ui-sref=\"person({ key:person.key })\">{{ person.name }}</a></td><td>{{ person.key | number:0 }}</td><td>{{ person.phone | number:0 }}</td><td>{{ person.key | number:0 }}</td><td>{{ person.phone | number:0 }}</td><td>{{ person.key | number:0 }}</td><td>{{ person.phone | number:0 }}</td><td><a ui-sref=\"person({ key:person.key })\">{{ person.name }}</a></td></tr></table></div><div class=\"pull-right control-panel\"><button type=\"button\" class=\"btn btn-primary\" ui-sref=\"createperson\">Create</button></div></div>");
$templateCache.put("partials/persons-ng-repeat.html","<div class=\"person-form animated\" ng-class=\"{ \'up\': vm.filter }\"><form><div class=\"form-group\"><input type=\"text\" class=\"form-control input-lg\" placeholder=\"Filter persons\" typeahead=\"person as person.key for person in vm.persons | filter:$viewValue | limitTo:10\"></div></form><h1>Angular ng-repeat rendering {{vm.persons.length}} rows</h1><div><table class=\"table table-striped\"><thead><th>Name</th><th>Key</th><th>Phone</th><th>Key</th><th>Phone</th><th>Key</th><th>Phone</th><th>Name</th></thead><tr ng-repeat=\"person in vm.persons | filter: vm.filter\"><td><a ui-sref=\"person({ key:person.key })\">{{ person.name }}</a></td><td>{{ person.key | number:0 }}</td><td>{{ person.phone | number:0 }}</td><td>{{ person.key | number:0 }}</td><td>{{ person.phone | number:0 }}</td><td>{{ person.key | number:0 }}</td><td>{{ person.phone | number:0 }}</td><td><a ui-sref=\"person({ key:person.key })\">{{ person.name }}</a></td></tr></table></div><div class=\"pull-right control-panel\"><button type=\"button\" class=\"btn btn-primary\" ui-sref=\"createperson\">Create</button></div></div>");
$templateCache.put("partials/persons-react.html","<div class=\"person-form animated\" ng-class=\"{ \'up\': vm.filter }\"><form><div class=\"form-group\"><input type=\"text\" class=\"form-control input-lg\" placeholder=\"Filter persons\" ng-model=\"vm.filter\"></div></form><h1>React rendering {{vm.persons.length}} rows</h1><person-table persons=\"vm.persons\" callback=\"vm.onClickPerson\"></person-table></div>");}]);