'use strict';

angular.module('theatreProjApp')
  .controller('ProductionMeetingCtrl', ['$scope', 'prodMeetings', '$modal', 'theatreGroups',
  function ($scope, prodMeetings, $modal, theatreGroups) {

    $scope.prodMeetings = prodMeetings.meetings;

    $scope.createNewProdMeeting = function() {
      // Create new production meeting here
      var newProdMeeting = $modal.open({
        templateUrl: "app/production-meeting/newProdMeeting/newProdMeeting.html",
        controller: "NewProdMeetingCtrl",
        size: 'lg',
        resolve: {
          groups: ['theatreGroups', function(theatreGroups) {
            return theatreGroups.getAll();
          }]
        }
      });
    };

  }]);
