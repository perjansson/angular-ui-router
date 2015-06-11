angular.module('personApp').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('persons', {
			url: '/persons',
			resolve: {
				persons: ['PersonsService', function(personsService) {
			    	return personsService.getPersons();
			  	}],
				person: function () { return {}; }
			},
			templateUrl: 'partials/persons.html',
			controller: 'PersonsCtrl'
			})

		.state('search', {
			url: '/persons/search/:query',
			resolve: {
				persons: ['$stateParams', 'PersonsService', function($stateParams, personsService) {
			    	return personsService.searchPersons($stateParams.query);
				}],
				person: function() { return {}; }
				},
			templateUrl: 'partials/persons.html',
			controller: 'PersonsCtrl'
			})

		.state('person', {
			url: '/persons/:name',
			resolve: {
				persons: function () { return []; },
				person: ['$stateParams', 'PersonsService', function($stateParams, personsService) {
					return personsService.getPerson($stateParams.name);
				}]
			},
			templateUrl: 'partials/person.html',
			controller: 'PersonsCtrl'
		});

	$urlRouterProvider.otherwise('/persons');

}]);

angular.module('personApp').run(function($state, $rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});