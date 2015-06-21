(function() {
  'use strict';

	angular
		.module('personApp')
		.service('personsService', ['$http', 'personFactory', personsService]);

		function personsService($http, personFactory) {

			this.createPerson = function(person) {
				return $http.post('/persons', person);
			};

			this.updatePerson = function(person) {
				return $http.post('/person/' + person.key, person);
			};

			this.searchPersons = function(query) {
				return $http.get('/persons/' + query)
          .then(personFactory.createFromJsonResponse)
			};

			this.getPersons = function() {
				return $http.get('/persons')
          .then(personFactory.createFromJsonResponse)
			};

			this.getPerson = function(key) {
				return $http.get('/person/' + key)
          .then(personFactory.createFromJsonResponse);
			};

	};

})();
