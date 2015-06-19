(function() {
	'use strict';

	angular
		.module('personApp')
		.config(['$stateProvider', '$urlRouterProvider', routeConfig]);

		function routeConfig($stateProvider, $urlRouterProvider) {

			$stateProvider
				.state('persons', {
					url: '/persons',
					resolve: {
						persons: ['PersonsService', function(personsService) {
					    	return personsService.getPersons();
					  	}],
						person: function () { return {}; },
						filter: function () { return ""; }
					},
					templateUrl: 'partials/persons.html',
					controller: 'PersonsCtrl as vm'
				})

				.state('search', {
					url: '/persons/:query',
					resolve: {
						persons: ['$stateParams', 'PersonsService', function($stateParams, personsService) {
					    	return personsService.searchPersons($stateParams.query);
						}],
						person: function() { return {}; },
						filter: ['$stateParams', function($stateParams) {
							return $stateParams.query;
						}]
					},
					templateUrl: 'partials/persons.html',
					controller: 'PersonsCtrl as vm'
				})

				.state('person', {
					url: '/person/:key',
					resolve: {
						persons: function () { return []; },
						person: ['$stateParams', 'PersonsService', function($stateParams, personsService) {
							return personsService.getPerson($stateParams.key);
						}],
						filter: function () { return ""; }
					},
					templateUrl: 'partials/person.html',
					controller: 'PersonsCtrl as vm'
				})

				.state('editperson', {
					url: '/person/:key/edit',
					resolve: {
						persons: function () { return []; },
						person: ['$stateParams', 'PersonsService', function($stateParams, personsService) {
							return personsService.getPerson($stateParams.key);
						}],
						filter: function () { return ""; }
					},
					templateUrl: 'partials/editperson.html',
					controller: 'PersonsCtrl as vm'
				})

				.state('createperson', {
					url: '/persons',
					resolve: {
						persons: function () { return []; },
						person: function() {
							return {
								data: {
									name: "",
									phone: ""
								}
							};
						},
						filter: function () { return ""; }
					},
					templateUrl: 'partials/editperson.html',
					controller: 'PersonsCtrl as vm'
				});

			$urlRouterProvider.otherwise('/persons');

		};

	angular
		.module('personApp')
		.run(function($state, $rootScope) {
	  	$rootScope.$on("$stateChangeError", console.log.bind(console));
	});

})();
