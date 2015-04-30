'use strict';

angular.module('theatreProjApp')
  .factory('theatreGroups', ['$http',
  function ($http) {
    // Service logic
    // ...

    var o = {
      groups: []
    };

    // Public API here
    o.getAll = function() {
      $http.get('api/groups').success(function(data) {
        angular.copy(data, o.groups);
      });
    };

    return o;
  }]);
