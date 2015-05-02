'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('production-meeting-theatre-group', {
        url: '/production-meeting/{groupName}/{meetingTitle}',
        templateUrl: 'app/production-meeting/meeting-details/meeting-details.html',
        controller: 'MeetingDetailsCtrl',
        resolve: {
          prodMeeting: ['$stateParams', 'prodMeetings', 
          function ($stateParams, prodMeetings) {
            return prodMeetings.get($stateParams.groupName, $stateParams.meetingTitle);
          }]
        }
      });
  });