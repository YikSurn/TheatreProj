'use strict';

angular.module('theatreProjApp')
  .controller('MeetingWizardCtrl', ['prodMeeting', '$scope', 
  function (prodMeeting, $scope) {
    $scope.prodMeeting = prodMeeting;

  }]);
