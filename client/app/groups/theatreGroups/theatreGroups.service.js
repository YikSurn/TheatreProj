'use strict';

angular.module('theatreProjApp')
  .factory('theatreGroups', ['$http',
  function ($http) {
    // Service logic
    // ...

    var o = {
      groups: [],
      group: {}
    };

    // Public API here
    o.getAll = function() {
      $http.get('api/groups').success(function(data) {
        angular.copy(data, o.groups);
      });
    };

    o.get = function(name) {
      return $http.get('api/groups/' + name).success(function (data) {
        angular.copy(data, o.group);
      });
    };

    return o;
  }]);
