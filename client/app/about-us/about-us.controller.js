'use strict';

angular.module('theatreProjApp')
  .controller('AboutUsCtrl', function ($scope) {
  	$scope.isFlipped = false;
    $scope.flip = function () {
    	$scope.isFlipped = !$scope.isFlipped;
    };
  });
