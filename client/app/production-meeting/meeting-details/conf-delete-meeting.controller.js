'use strict';

angular.module('theatreProjApp')
  .controller('ConfDeleteMeetingCtrl', ['$modalInstance', 'prodMeetings', '$scope',
   function ($modalInstance, prodMeetings, $scope) {

    $scope.prodMeeting = prodMeetings.meeting;

    // Create the production meeting and redirect to the details page
    $scope.deleteMeeting = function () {
      prodMeetings.remove();
      $scope.cancel();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }
  }]);