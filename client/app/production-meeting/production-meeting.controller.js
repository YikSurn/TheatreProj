'use strict';

angular.module('theatreProjApp')
  .controller('ProductionMeetingCtrl', ['$scope', 'prodMeetings', '$modal', 'theatreGroups',
  function ($scope, prodMeetings, $modal, theatreGroups) {

    $scope.prodMeetings = prodMeetings.meetings;

    // Opens a modal to create new production meeting
    $scope.createNewProdMeeting = function () {
      var newProdMeeting = $modal.open({
        templateUrl: "app/production-meeting/new-prod-meeting/new-prod-meeting.html",
        controller: "NewProdMeetingCtrl",
        size: 'lg',
        resolve: {
          groups: ['theatreGroups', function (theatreGroups) {
            return theatreGroups.getAll();
          }]
        }
      });
    };

  }]);
