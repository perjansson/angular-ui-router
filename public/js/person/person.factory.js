(function() {
  'use strict';

  angular
    .module('personApp')
    .factory('Person', personFactory);

  function personFactory() {

    function Person(key, name, phone) {
      this.key = key;
      this.name = name;
      this.phone = phone;
    }

    Person.prototype = {
      getAllInfo : function() {
        return "Key: " + this.key + ", Name: " + this.name + ", Phone: " + this.phone;
      }
    };

    Person.createFromJsonResponse = function(response) {
      var json = (response.data !== undefined) ? response.data : response;
      if (angular.isArray(json)) {
        return json
          .map(Person.createFromJsonResponse)
          .filter(Boolean);
      }
      return new Person(json.key, json.name, json.phone);
    };

    return Person;

  };

})();
