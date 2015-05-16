'use strict';

angular.module('theatreProjApp')
  .controller('MeetingDetailsCtrl', ['prodMeetings', '$scope', 
  function (prodMeetings, $scope) {
    $scope.prodMeeting = prodMeetings.meeting;

  }]);
