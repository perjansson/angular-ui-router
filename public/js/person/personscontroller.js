angular.module('personApp').controller('PersonsCtrl', ['$state', 'PersonsService', 'persons', 'person', 'filter', function($state, personsService, persons, person, filter) {

  this.persons = persons.data;
  this.person = person.data;
  this.filter = filter;

  this.personQuery = $state.params.query;

  this.updatePerson = function() {
    personsService.updatePerson(this.person)
      .then(function() {
        $state.go('persons');
      });
  };

  this.createPerson = function() {
    personsService.createPerson(this.person)
      .then(function() {
        $state.go('persons');
      });
  };
    
  this.searchPerson = function(query) {
    if (query.length) {
      return $state.go('persons');
    }
    
    $state.go('search', {
      query: query
    });
  };

}]);
