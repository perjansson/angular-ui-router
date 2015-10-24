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
