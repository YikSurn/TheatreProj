'use strict';

angular.module('theatreProjApp')
  .controller('ShowsCtrl', function ($scope, $http, socket, $modal, $log) {
    $scope.createIsCollapsed = true;

    $http.get('api/projectshows').success(function(projectshows) {
        $scope.projectshows = projectshows;
        socket.syncUpdates('projectshow', $scope.projectshows);
    });

    $http.get('api/groups').success(function(groups) {
        $scope.groups = groups;
        socket.syncUpdates('group', $scope.groups)
    });


    $scope.$on('$destroy', function(){
    	socket.unsyncUpdates('projectshow');
    });

    $scope.remove = function(project) {
    	var confprojectshow = confirm("Are you sure you want to remove " + project.showName + "?");
        if (confprojectshow == true) {
            $http.delete('api/projectshows/' + project._id);
        };
    };

    /*Ensures date must be selected from todays date*/
    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    /*Function to create a new show*/
    $scope.createProject = function(showName, showGroup, showStatus, dt) {
        $scope.showName = showName;
        $scope.showGroup = showGroup;
        $scope.showStatus = showStatus;
        $scope.prodDate = dt.toDateString();
        $http.post('api/projectshows', {showName: $scope.showName, showStatus: $scope.showStatus, group_id: $scope.showGroup ,prodDate: $scope.prodDate});
        alert("Project Created");
        $scope.newProject.$setPristine();
        $scope.createIsCollapsed = true;
    };

});
