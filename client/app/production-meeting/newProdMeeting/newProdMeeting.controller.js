'use strict';

angular.module('theatreProjApp')
  .controller('NewProdMeetingCtrl', ['$scope', 'prodMeetings', 'theatreGroups', '$modalInstance',
   function ($scope, prodMeetings, theatreGroups, $modalInstance) {
    $scope.groups = theatreGroups.groups;

    $scope.newMeeting = {};

    $scope.createNewMeeting = function() {
      prodMeetings.create($scope.newMeeting);
      $scope.newMeeting = {};
      $modalInstance.dismiss('cancel');
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    }
  }]);
