'use strict';

angular.module('theatreProjApp')
  .controller('ViewProfileCtrl', function ($scope, $modalInstance, user) {
    $scope.close = function () {
        $modalInstance.close();
    };

});