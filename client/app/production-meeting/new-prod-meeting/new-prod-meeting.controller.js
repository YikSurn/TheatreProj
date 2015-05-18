'use strict';

angular.module('theatreProjApp')
  .controller('NewProdMeetingCtrl', ['$scope', 'prodMeetings', 'theatreGroups', '$modalInstance', '$state', 'chosenGroup',
   function ($scope, prodMeetings, theatreGroups, $modalInstance, $state, chosenGroup) {
    $scope.groups = theatreGroups.groups;

    $scope.newMeeting = {};

    if (chosenGroup) {
      // There is a group already chosen in creating the production meeting
      $scope.chosenGroup = theatreGroups.group;
      $scope.newMeeting.group = $scope.chosenGroup._id;
    }

    // Create the production meeting and redirect to the details page
    $scope.createNewMeeting = function () {
      if($scope.newMeeting.title.indexOf('/') > -1 || $scope.newMeeting.title.indexOf('?') > -1 || $scope.newMeeting.title.indexOf("%") > -1) {
        alert("You have included illegal characters (/, ? or %) not permitted in production meeting titles. Please try a different title.");
        return;
      }
      prodMeetings.create($scope.newMeeting);
      $scope.cancel();
      var group = theatreGroups.getOnId($scope.newMeeting.group);
      $state.go('production-meeting-details', { groupName: group.name, meetingTitle: $scope.newMeeting.title });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }
  }]);