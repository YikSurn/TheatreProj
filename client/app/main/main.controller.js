'use strict';

angular.module('theatreProjApp')
  .controller('MainCtrl', function ($scope, Auth) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
  });
