angular.module('personApp').controller('PersonsCtrl', ['$state', 'PersonsService', 'persons', 'person', 'filter', function($state, personsService, persons, person, filter) {

  this.persons = persons.data;
  this.person = person.data;
  this.filter = filter;
  this.personQuery = $state.params.query;

  this.savePerson = function() {
    console.log(this.person.key);
    if (this.person.key) {
      updatePerson(this.person);
    } else {
      createPerson(this.person);
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
    
  this.searchPerson = function(query) {
    if (query.length) {
      return $state.go('persons');
    }
    
    $state.go('search', {
      query: query
    });
  };

}]);
