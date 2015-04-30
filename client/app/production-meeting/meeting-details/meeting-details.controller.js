'use strict';

angular.module('theatreProjApp')
  .controller('MeetingDetailsCtrl', ['prodMeeting', '$scope', 
  function (prodMeeting, $scope) {
    $scope.prodMeeting = prodMeeting;
  }]);
