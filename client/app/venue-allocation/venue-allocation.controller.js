'use strict';

angular.module('theatreProjApp')
  .controller('VenueAllocationCtrl', function ($scope) {
  	/* Returns a Date object set to today, 12am. */
    var getTodayZero = function () {
    	var today = new Date();
	  	today.setHours(0,0,0,0);
	  	return today;
    };

    var timeDiff = function (startDate, endDate) {
    	var timeDiff = endDate.getTime() - startDate.getTime();
		return timeDiff;
    }

    var dayDiff = function (startDate, endDate) {
    	var timeDiff = endDate.getTime() - startDate.getTime();
		var daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
		return daysDiff;
    }
  	
  	var today = getTodayZero();

  	/* The start date for the application period. Currently a dummy date. */
    $scope.startDate = new Date(today);
    $scope.startDate.setDate(today.getDate() - 1);

    /* The end date for the application period. Currently a dummy date. */
    $scope.endDate = new Date(today);
    $scope.endDate.setDate(today.getDate() + 1);

    /* Returns the number of days in the application period. */
    $scope.getTotalDays = function () {
		return dayDiff($scope.startDate, $scope.endDate);
    };

    /* Returns the number of elapsed days in the application period. */
    $scope.getElapsedDays = function () {
    	return dayDiff($scope.startDate, new Date());
    };

    /* Returns the number of remaining days in the application period. */
    $scope.getRemainingDays = function () {
    	return dayDiff(getTodayZero(), $scope.endDate);
    };

    /* Returns 'day remaining' if getRemainingDays == 1,
    returns 'days remaining' otherwise. */
    $scope.getRemainingDays_String = function () {
    	if ($scope.getRemainingDays() == 1) { return 'day remaining'; }
    	else return 'days remaining';
    };

    /* Returns the progress from startDate to endDate as a two-digit precision float. */
    $scope.getProgressFraction = function () {
    	var totalTime = timeDiff($scope.startDate, $scope.endDate);
    	var elapsedTime = timeDiff($scope.startDate, getTodayZero());
    	var diff = elapsedTime / totalTime;
    	return Number(diff.toFixed(2));
    };

    /* The progress fraction up to which the progress bar should be success type. */
    $scope.successThreshold = 0.50;

    /* The progress fraction up to which the progress bar should be warning type. */
    $scope.warningThreshold = 0.80;

    /* Returns a string used by bootstrap-ui progress bars for styling, based on
    the application period progress. */
    $scope.getProgressType = function () {
    	var frac = $scope.getProgressFraction();
    	if (frac <= $scope.successThreshold) { return 'success'; }
    	else if (frac <= $scope.warningThreshold) { return 'warning'; }
    	else return 'danger';
    };
  });
