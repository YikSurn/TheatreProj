'use strict';

angular.module('theatreProjApp')
  .controller('EditDateRangesCtrl', function ($scope, $modalInstance, dateRanges) {
    $scope.dateRanges = dateRanges;

    $scope.ok = function () {
        $modalInstance.close($scope.dateRanges);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  });
