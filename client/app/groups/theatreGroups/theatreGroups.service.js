'use strict';

// Service for the theatre groups

angular.module('theatreProjApp')
  .factory('theatreGroups', ['$http',
  function ($http) {

    var o = {
      groups: [],
      group: undefined
    };

    o.getAll = function() {
      $http.get('api/groups').success(function(data) {
        angular.copy(data, o.groups);
      });
    };

    o.get = function(name) {
      return $http.get('api/groups/' + name).success(function (data) {
        o.group = angular.copy(data);
      });
    };

    o.getOnId = function(id) {
      for (var i = 0; i < o.groups.length; i++) {
        if (o.groups[i]._id == id) {
          return o.groups[i];
        }
      }
    };

    return o;
  }]);
