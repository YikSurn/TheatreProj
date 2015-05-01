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

    $scope.$on('$destroy', function(){
    	socket.unsyncUpdates('projectshow');
    });

    $scope.post = function() {
        var names = ['projectshow name',
        'The best!',
        'Great project',
        'Must see',
        'Are you missing out?'];
    	$http.post('api/projectshows', {showName: names[Math.floor(Math.random()*names.length)], showStatus: "Pre-production"});
    };

    $scope.remove = function(projectshow) {
    	var confprojectshow = confirm("Are you sure you want to remove " + projectshow.name + "?");
        if (confprojectshow == true) {
            $http.delete('api/projectshows/' + projectshow._id);
        };
    };

    /*Ensures date must be selected from todays date*/
    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    /*Function to create a new show*/
    $scope.createProject = function(showName, showStatus, dt) {
        $scope.showName = showName;
        $scope.showStatus = showStatus;
        $scope.prodDate = dt.toDateString();
        $http.post('api/projectshows', {showName: $scope.showName, showStatus: $scope.showStatus, prodDate: $scope.prodDate});
        alert("Project Created");
        $scope.newProject.$setPristine();
        $scope.createIsCollapsed = true;
    };

});
