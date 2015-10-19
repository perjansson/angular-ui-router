(function() {
  'use strict';

  angular
    .module('personApp')
    .service('personsService', ['$http', '$q', 'Person', personsService]);

  function personsService($http, $q, Person) {

    var fakePersons = [];
    _(10000).times(function(n) {
      fakePersons.push({
        key: n,
        name: "Person " + n,
        phone: n
      })
    })

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
      deferred.resolve(fakePersons);
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
