angular.module('personApp').service('PersonsService', ['$http', function($http) {

	this.savePerson = function(person) {
		return $http.post('/persons', person);
	};

	this.searchPersons = function(query) {
		return $http.get('/persons/' + query);
	};

	this.getPersons = function() {
		return $http.get('/persons');
	};

	this.getPerson = function(name) {
		return $http.get('/person/' + name);
	};

}]);