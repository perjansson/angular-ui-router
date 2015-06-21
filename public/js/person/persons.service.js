(function() {
  'use strict';

	angular
		.module('personApp')
		.service('PersonsService', ['$http', personsService]);

		function personsService($http) {

			this.createPerson = function(person) {
				return $http.post('/persons', person);
			};

			this.updatePerson = function(person) {
				return $http.post('/person/' + person.key, person);
			};

			this.searchPersons = function(query) {
				return $http.get('/persons/' + query);
			};

			this.getPersons = function() {
				return $http.get('/persons')
          .then(function(response) {
            return response.data;
          })
			};

			this.getPerson = function(key) {
				return $http.get('/person/' + key)
          .then(function(response) {
            return response.data;
          });
			};

	};

})();
