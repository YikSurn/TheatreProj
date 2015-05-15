'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('production-meeting-details', {
        url: '/production-meeting/{groupName}/{meetingTitle}',
        templateUrl: 'app/production-meeting/meeting-details/meeting-details.html',
        controller: 'MeetingDetailsCtrl',
        resolve: {
          prodMeetingPromise: ['$stateParams', 'prodMeetings', 
          function ($stateParams, prodMeetings) {
            return prodMeetings.get($stateParams.groupName, $stateParams.meetingTitle);
          }],
          prodMeetingsPromise: ['$stateParams', 'prodMeetings', 
          function ($stateParams, prodMeetings) {
            return prodMeetings.getAll();
          }]
        }
      });
  });