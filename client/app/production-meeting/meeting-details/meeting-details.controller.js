'use strict';

angular.module('theatreProjApp')
  .controller('MeetingDetailsCtrl', ['prodMeetings', '$scope', '$state',
  function (prodMeetings, $scope, $state) {
    $scope.prodMeetings = prodMeetings.meetings;
    $scope.prodMeeting = prodMeetings.meeting;

    $scope.prodMeetingsForGroup = prodMeetings.getForGroup($scope.prodMeeting.group._id);

    $scope.editName = false;

    // Display editor for production meeting name
    $scope.enableEditTitle = function() {
      $scope.editTitle = true;
      $scope.newTitle = angular.copy($scope.prodMeeting.title);
    };

    // Save edited production meeting Title
    $scope.saveTitle = function() {
      if ($scope.newTitle == $scope.prodMeeting.title) {
        // No change to title
        $scope.newTitle = undefined;
        $scope.disableEditTitle();
      }
      else if ($scope.prodTitleForm.$valid) {
        for (var i =0; i < $scope.prodMeetingsForGroup.length; i++) {
          if ($scope.newTitle == $scope.prodMeetingsForGroup[i].title) {
            alert($scope.newTitle + " already exists as a production meeting title for this group, please try a different title!");
          } else {
            $scope.prodMeeting.title = angular.copy($scope.newTitle);
            prodMeetings.update();
            $state.go('production-meeting-details', 
              { groupName: $scope.prodMeeting.group.name, meetingTitle: $scope.prodMeeting.title })
            $scope.newTitle = undefined;
            $scope.disableEditTitle();
          }
        }
      }
    };

    // Disable editing name
    $scope.disableEditTitle = function() {
      $scope.editTitle = false;
    };
  }]);
