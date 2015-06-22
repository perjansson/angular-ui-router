(function() {
  'use strict';

	angular
		.module('personApp')
		.service('personsService', ['$http', 'Person', personsService]);

		function personsService($http, Person) {

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
				return $http.get('/persons')
          .then(Person.createFromJsonResponse)
			};

			this.getPerson = function(key) {
				return $http.get('/person/' + key)
          .then(Person.createFromJsonResponse);
			};

	};

})();
