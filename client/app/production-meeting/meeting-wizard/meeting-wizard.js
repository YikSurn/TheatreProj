'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('meeting-wizard', {
        url: '/production-meeting/{groupName}/{meetingTitle}/wizard',
        abstract: true,
        templateUrl: 'app/production-meeting/meeting-wizard/meeting-wizard.html',
        controller: 'MeetingWizardCtrl',
        resolve: {
          prodMeetingPromise: ['$stateParams', 'prodMeetings', 
          function ($stateParams, prodMeetings) {
            return prodMeetings.get($stateParams.groupName, $stateParams.meetingTitle);
          }]
        }
      })
      .state('meeting-wizard.main', {
        url: '',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/attending.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.attending', {
        url: '#attending',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/attending.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.administration', {
        url: '#administration',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/administration.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.director', {
        url: '#director',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/director.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.musical-director', {
        url: '#musical-director',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/musical-director.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.choreographer', {
        url: '#choreographer',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/choreographer.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.production-manager', {
        url: '#production-manager',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/production-manager.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.sets', {
        url: '#sets',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/sets.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.props', {
        url: '#props',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/props.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.costumes', {
        url: '#costumes',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/costumes.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.wigs-and-makeup', {
        url: '#wigs-and-makeup',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/wigs-and-makeup.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.lighting', {
        url: '#lighting',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/lighting.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.sound', {
        url: '#sound',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/sound.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.vision-and-communication', {
        url: '#vision-and-communications',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/vision-and-communication.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.stage-manager', {
        url: '#stage-manager',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/stage-manager.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.schedule', {
        url: '#schedule',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/schedule.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.budget', {
        url: '#budget',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/budget.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.risk-management', {
        url: '#risk-management',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/risk-management.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.key-dates', {
        url: '#key-dates',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/key-dates.html',
        controller: 'MeetingWizardCtrl',
      })
      .state('meeting-wizard.next-meeting', {
        url: '#next-meeting',
        templateUrl: 'app/production-meeting/meeting-wizard/sections/next-meeting.html',
        controller: 'MeetingWizardCtrl',
      })
  });