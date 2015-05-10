'use strict';

angular.module('theatreProjApp')
  .controller('MeetingWizardCtrl', ['prodMeetings', '$scope', '$state',
  function (prodMeetings, $scope, $state) {
    $scope.$state = $state;

    $scope.prodMeeting = prodMeetings.meeting;

    // For datepicker
    $scope.datePicker = {
      format: 'dd-MMMM-yyyy',
      minDate: '2015-01-01',
      opened : {}
    };
    $scope.openDatePicker = function ($event, id) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.datePicker.opened[id] = !$scope.datePicker.opened[id];
    };

    // Go to a section, current is the current state, direction is 1 for next, -1 for previous
    var goToSection = function(current, direction) {
      var sections = ['main', 'attending', 'administration', 'director', 'musical-director', 
        'choreographer', 'production-manager', 'sets', 'props', 'costumes', 'wigs-and-makeup', 
        'lighting', 'sound', 'vision-and-communication', 'stage-manager', 'schedule', 'budget', 
        'risk-management', 'key-dates', 'next-meeting'] 
      var index = sections.indexOf(current.replace('meeting-wizard.', ''));
      if (direction == 'next') {
        index++;
        if (sections[index] == 'attending') {
          // Current state is at 'main'; go to next section
          index++;
        }
      } else if (direction == 'back') {
        index--;
      }
      return 'meeting-wizard.' + sections[index];
    };

    // Save the details in the page and go to next page
    $scope.saveProgress = function (direction) {
      prodMeetings.update();
      // Go to next section
      $state.go(goToSection($state.current.name, direction));
    };

    // Save details and return to details page
    $scope.saveAndReturn = function () {
      prodMeetings.update();
      $state.go('production-meeting-details', { 'groupName': $scope.prodMeeting.group.name , 'meetingTitle': $scope.prodMeeting.title });
    };
  }]);
