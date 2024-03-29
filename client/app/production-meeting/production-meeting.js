'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('production-meeting', {
        url: '/production-meeting',
        templateUrl: 'app/production-meeting/production-meeting.html',
        controller: 'ProductionMeetingCtrl',
        authenticate: true,
        resolve: {
          prodMeetingPromise: ['prodMeetings', function (prodMeetings) {
            return prodMeetings.getAll();
          }]
        }
      });
  });