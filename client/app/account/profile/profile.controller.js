'use strict';

angular.module('theatreProjApp')
  .controller('ProfileCtrl', function ($scope, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
  });   
