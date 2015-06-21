(function() {
  'use strict';

  angular
    .module('personApp')
    .controller('PersonsController', ['$state', 'personsService', 'persons', 'person', 'filter', PersonsController]);

  function PersonsController($state, personsService, persons, person, filter) {

    var vm = this;

    vm.persons = persons;
    vm.person = person;
    vm.filter = filter;
    vm.personQuery = $state.params.query;
    vm.savePerson = savePerson;
    vm.searchPerson = searchPerson;

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
