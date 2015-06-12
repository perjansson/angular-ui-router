angular.module('personApp').service('PersonsService', ['$http', function($http) {

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
		return $http.get('/persons');
	};

	this.getPerson = function(key) {
		return $http.get('/person/' + key);
	};

}]);