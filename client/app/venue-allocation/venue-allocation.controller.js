'use strict';

angular.module('theatreProjApp')
  .controller('VenueAllocationCtrl', function ($scope, $http) {
    var timeDiff = function (startDate, endDate) {
    	var timeDiff = endDate.getTime() - startDate.getTime();
		return timeDiff;
    };

    var dayDiff = function (startDate, endDate) {
    	var timeDiff = endDate.getTime() - startDate.getTime();
		var daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
		return daysDiff;
    };

    /* Returns the number of days in the application period. */
    var getTotalDays = function () {
        return dayDiff($scope.startDate, $scope.endDate);
    };

    /* Returns the number of elapsed days in the application period. */
    var getElapsedDays = function () {
        return dayDiff($scope.startDate, new Date());
    };

    /* Returns the number of remaining days in the application period. */
    var getRemainingDays = function () {
        return dayDiff(new Date(), $scope.endDate);
    };

    /* Returns 'day remaining' if getRemainingDays == 1,
    returns 'days remaining' otherwise. */
    var getRemainingDays_String = function () {
        if (getRemainingDays() == 1) { return 'day remaining'; }
        else return 'days remaining';
    };

    /* Returns the progress from startDate to endDate as a two-digit precision float. */
    var getProgressFraction = function () {
        var totalTime = timeDiff($scope.startDate, $scope.endDate);
        var elapsedTime = timeDiff($scope.startDate, new Date());
        var diff = elapsedTime / totalTime;
        return Number(diff.toFixed(2));
    };

    /* Returns a string used by bootstrap-ui progress bars for styling, based on
    the application period progress. */
    var getProgressType = function () {
        var frac = getProgressFraction();
        if (frac <= $scope.successThreshold) { return 'success'; }
        else if (frac <= $scope.warningThreshold) { return 'warning'; }
        else return 'danger';
    };

    $scope.refreshDates = function () {
        $scope.progressFraction = getProgressFraction();
        $scope.progressType = getProgressType();
        $scope.elapsedDays = getElapsedDays();
        $scope.totalDays = getTotalDays();
        $scope.remainingDays = getRemainingDays();
        $scope.remainingDaysString = getRemainingDays_String();
    };

    $scope.$watch('startDate', function() {
        $scope.refreshDates();   
    });

    $scope.$watch('endDate', function() {
        $scope.refreshDates();   
    });

    /* The progress fraction up to which the progress bar should be success type. */
    $scope.successThreshold = 0.50;

    /* The progress fraction up to which the progress bar should be warning type. */
    $scope.warningThreshold = 0.80;
  	
    $http.get('api/venueallocation/mostrecent').success(function(allocation) {
        $scope.startDate = new Date(allocation.ApplicationPeriodStartDate);
        $scope.endDate = new Date(allocation.ApplicationPeriodEndDate);
        $scope.refreshDates();
    });
  });
