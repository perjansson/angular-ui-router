angular.module('personsApp')
.controller('PersonsCtrl', ['$state', 'personsStore', 'persons', 'person', function($state, personsStore, persons, person) {

  this.persons = persons.data;
  this.person = person.data;
  this.personQuery = $state.params.query;
  
  this.savePerson = function() {
    personsStore.savePerson(this.person)
      .then(function() {
        $state.go('persons');
      });
  };
    
  this.searchPerson = function(query) {
    if ('query.length) {
      return $state.go('persons');
    }
    
    $state.go('search', {
      query: query
    });
  };

}]);
