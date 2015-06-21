(function() {
  'use strict';

  angular
    .module('personApp')
    .factory('personFactory', personFactory);

  function personFactory() {

    function Person(key, name, phone) {
      this.key = key;
      this.name = name;
      this.phone = phone;
      this.getAllInfo = function() {
        return "Key: " + this.key + ", Name: " + this.name + ", Phone: " + this.phone;
      }
    }

    function create(key, name, phone) {
      return new Person(key, name, phone);
    };

    function createFromJsonResponse(response) {
      var json = (response.data !== undefined) ? response.data : response;
      if (angular.isArray(json)) {
        return json
          .map(createFromJsonResponse)
          .filter(Boolean);
      }
      return create(json.key, json.name, json.phone);
    };

    return {
      create : create,
      createFromJsonResponse: createFromJsonResponse
    }

  };

})();
