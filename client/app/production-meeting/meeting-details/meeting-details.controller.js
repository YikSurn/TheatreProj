'use strict';

// Controller to handle the meeting details page

angular.module('theatreProjApp')
  .controller('MeetingDetailsCtrl', ['prodMeetings', '$scope', '$state', '$modal',
  function (prodMeetings, $scope, $state, $modal) {
    $scope.prodMeetings = prodMeetings.meetings;
    $scope.prodMeeting = prodMeetings.meeting;

    // Get all the production meetings for a group
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
          // Check if there exists a same production meeting title for the same group
          if ($scope.newTitle == $scope.prodMeetingsForGroup[i].title) {
            alert($scope.newTitle + " already exists as a production meeting title for this group, please try a different title!");
          } else {
            $scope.prodMeeting.title = angular.copy($scope.newTitle);
            
            // Update the production meetingtitle
            prodMeetings.update();

            // Update the URL to match the new title
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

    $scope.deleteProdMeeting = function () {
      var confDelete = $modal.open({
        templateUrl: 'app/production-meeting/meeting-details/conf-delete-meeting.html',
        controller: 'ConfDeleteMeetingCtrl',
        size: 'sm'
      });
    };
  }]);
