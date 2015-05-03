'use strict';

angular.module('theatreProjApp')
  .controller('ShowsCtrl', function ($scope, $http, socket, $modal, $log) {
    $scope.projectshowRows = [];
    $scope.createIsCollapsed = true;

    var sliceprojectshowList = function(projectshows) {
        $scope.projectshowRows = [];
        var len = projectshows.length;
        var chunkSize = 3;
        for(var i = 0; i < len; i += chunkSize) {
            $scope.projectshowRows.push(projectshows.slice(i,i+chunkSize));
        }
        console.log($scope.projectshowRows);
    };

    $http.get('api/projectshows').success(function(projectshows) {
        $scope.projectshows = projectshows;
        sliceprojectshowList(projectshows);
        socket.syncUpdates('projectshow', $scope.projectshows, function(event, projectshow, projectshows) {
            sliceprojectshowList(projectshows);
        });
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
