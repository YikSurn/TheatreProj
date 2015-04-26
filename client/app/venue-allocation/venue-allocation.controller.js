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
    var getTotalDays = function() {
        return dayDiff($scope.startDate, $scope.endDate);
    };

    /* Returns the number of elapsed days in the application period. */
    var getElapsedDays = function() {
        return dayDiff($scope.startDate, new Date());
    };

    /* Returns the number of remaining days in the application period. */
    var getRemainingDays = function() {
        return dayDiff(new Date(), $scope.endDate);
    };

    /* Returns 'day remaining' if getRemainingDays == 1,
    returns 'days remaining' otherwise. */
    var getRemainingDays_String = function() {
        if (getRemainingDays() == 1) { return 'day remaining'; }
        else return 'days remaining';
    };

    /* Returns the progress from startDate to endDate as a two-digit precision float. */
    var getProgressFraction = function() {
        var totalTime = timeDiff($scope.startDate, $scope.endDate);
        var elapsedTime = timeDiff($scope.startDate, new Date());
        var diff = elapsedTime / totalTime;
        return Number(diff.toFixed(2));
    };

    /* Returns a string used by bootstrap-ui progress bars for styling, based on
    the application period progress. */
    var getProgressType = function() {
        var frac = getProgressFraction();
        if (frac <= $scope.successThreshold) { return 'success'; }
        else if (frac <= $scope.warningThreshold) { return 'warning'; }
        else return 'danger';
    };

    $scope.refreshDates = function() {
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

    $scope.datesChanged = function() {
        if ($scope.startDate == null) { return false; };
        if ($scope.origStartDate == null) { return false; };
        if ($scope.endDate == null) { return false; };
        if ($scope.origEndDate == null) { return false; };
        return ($scope.startDate.getTime() != $scope.origStartDate.getTime()) ||
        ($scope.endDate.getTime() != $scope.origEndDate.getTime());
    };

    $scope.applyDateChanges = function() {
        $scope.origStartDate = new Date($scope.startDate.getTime());
        $scope.origEndDate = new Date($scope.endDate.getTime());
        $scope.venueallocation.ApplicationPeriodStartDate = $scope.startDate;
        $scope.venueallocation.ApplicationPeriodEndDate = $scope.endDate;
        $http.put('api/venueallocation/' + $scope.venueallocation._id, $scope.venueallocation);
    }

    $scope.cancelDateChanges = function() {
        $scope.startDate = new Date($scope.origStartDate.getTime());
        $scope.endDate = new Date($scope.origEndDate.getTime());
    }

    /* The progress fraction up to which the progress bar should be success type. */
    $scope.successThreshold = 0.50;

    /* The progress fraction up to which the progress bar should be warning type. */
    $scope.warningThreshold = 0.80;

    $scope.dateFormat = 'MMM d';
  	
    /* Get the venueallocation object (which holds the application dates) */
    $http.get('api/venueallocation/mostrecent').success(function(allocation) {
        $scope.venueallocation = allocation;
        $scope.origStartDate = new Date(allocation.ApplicationPeriodStartDate);
        $scope.startDate = new Date(allocation.ApplicationPeriodStartDate);
        $scope.origEndDate = new Date(allocation.ApplicationPeriodEndDate);
        $scope.endDate = new Date(allocation.ApplicationPeriodEndDate);
        $scope.refreshDates();
    });

    $scope.applyDateRangeChanges = function() {
        $http.put('api/venueallocation/' + $scope.venueallocation._id, $scope.venueallocation);
    };

    $scope.origRequests = {};
    $scope.requests = {};
    /* Returns the request objects whose date range matches the given range.
    @param range a json object with StartDate and EndDate (Date strings). */
    $scope.getRequestsForDateRange = function(range) {
        var ret = [];
        for (var i = 0; i < $scope.requests.length; i++) {
            var req = $scope.requests[i];
            if (req.StartDate != range.StartDate || req.EndDate != range.EndDate) {continue;};
            ret.push(req);
        };

        return ret;
    };

    /* Sets req.Approved to true, sets Approved to false for all other reqs from
    the same Group, sets Approved to false for all other reqs in the same slot. */
    $scope.selectReq = function(req, range) {
        req.Approved = true;

        for (var i = 0; i < $scope.requests.length; i++) {
            var req2 = $scope.requests[i];
            if (req2 == req) {continue;};

            if (req2.Group.Name == req.Group.Name) {
                req2.Approved = false;
            }

            else if (req2.StartDate == range.StartDate && req2.EndDate == range.EndDate) {
                req2.Approved = false;
            }
        };

        refreshApprovedGroups();
    };

    /* An array containing the names of groups that have at least one approved request. */
    var approvedGroups = [];

    /* Refreshes the approvedGroups array based on $scope.requests. */
    var refreshApprovedGroups = function() {
        approvedGroups = [];

        for (var i = 0; i < $scope.requests.length; i++) {
            var req = $scope.requests[i];
            if (req.Approved) {approvedGroups.push(req.Group.Name)};
        };
    };

    /* Returns a string for btn styling based on request status.
    Returns 'btn-success' if the request is approved.
    Returns 'btn-danger' if the request is not approved AND no other requests of the same
    group are approved.
    Returns '' if the request is not approved but another request of the same group is
    approved. */
    $scope.getRequestBtnClass = function(req) {
        if (req.Approved) {return 'btn-success';}
        else if (approvedGroups.indexOf(req.Group.Name) == -1) {return 'btn-danger';}
        else return '';
    };

    /* Returns true if any req.Approved is different from that of the original req. */
    $scope.allocationChanged = function() {
        for (var i = 0; i < $scope.requests.length; i++) {
            var req = $scope.requests[i];
            var origReq = $scope.origRequests[i];
            if (req.Approved != origReq.Approved) {return true;};
        };
        return false;
    };

    $scope.cancelAllocationChanges = function() {
        $scope.requests = angular.copy($scope.origRequests);
    };

    /* Updates db records for reqs that have changed. */
    $scope.applyAllocationChanges = function() {
        for (var i = 0; i < $scope.requests.length; i++) {
            var req = $scope.requests[i];
            var origReq = $scope.origRequests[i];
            if (req.Approved == origReq.Approved) {continue;};
            $http.put('api/venueallocationrequests/' + req._id, req);
        };
        $scope.origRequests = angular.copy($scope.requests);
    };

    /* Get the allocation requests */
    $http.get('api/venueallocationrequests').success(function(reqs) {
        $scope.origRequests = angular.copy(reqs);
        $scope.requests = reqs;

        refreshApprovedGroups();
    });
  });
