var personsApp = angular.module('personsApp', ['ui.router']);

personsApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('persons', {
      url: '/persons',
      resolve: {
        persons: ['personsStore',
          function(personsStore) {
            return personsStore.getPersons();
          }],
        person: function () {
          return {};
        }
      },
      templateUrl: 'partials/persons.html',
      controller: 'PersonsCtrl'
    })
    
    .state('search', {
      url: '/persons/search/:query',
      resolve: {
      
      },
      templateUrl: '...',
      controller: 'PersonsCtrl'
    })
  
    .state('person', {
      url: '/persons/:name',
      resolve: {
        persons: function () {
          return [];
        },
        person: ['$stateParams', 'goatsStore', function($stateParams, goatsStore) {
          return goatsStore.getGoat($stateParams.name);
        }]
      },
      templateUrl: 'partials/person.html',
      controller: 'PersonsCtrl'
    })

  $urlRouterProvider.otherwise('/persons');

}]);
