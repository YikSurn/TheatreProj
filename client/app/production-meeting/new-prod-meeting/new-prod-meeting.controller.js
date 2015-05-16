'use strict';

angular.module('theatreProjApp')
  .controller('NewProdMeetingCtrl', ['$scope', 'prodMeetings', 'theatreGroups', '$modalInstance', '$state',
   function ($scope, prodMeetings, theatreGroups, $modalInstance, $state) {
    $scope.groups = theatreGroups.groups;

    $scope.newMeeting = {};

    if (theatreGroups.group) {
      // There is a group already chosen in creating the production meeting
      $scope.chosenGroup = theatreGroups.group;
      $scope.newMeeting.group = $scope.chosenGroup._id;
    }

    // Create the production meeting and redirect to the details page
    $scope.createNewMeeting = function () {
      prodMeetings.create($scope.newMeeting);
      $scope.cancel();
      var group = theatreGroups.getOnId($scope.newMeeting.group);
      $state.go('production-meeting-details', { groupName: group.name, meetingTitle: $scope.newMeeting.title });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }
  }]);