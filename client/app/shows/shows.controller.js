'use strict';

angular.module('theatreProjApp')
  .controller('ShowsCtrl', function ($scope, Auth, $http, socket, $modal, $log) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.createIsCollapsed = true;
    $scope.projectsLoaded = false;


    $http.get('api/projectshows').success(function(projectshows) {
        $scope.projectshows = projectshows;
        $scope.testProjectData();
        socket.syncUpdates('projectshow', $scope.projectshows, function(event, projectshow, projectshows) {
            $scope.testProjectData();
        });
        $scope.projectsLoaded = true;
    });

    $scope.testProjectData = function() {
        $scope.projectData = true;
        if($scope.projectshows.length === 0) {
            $scope.projectData = false;
        }
    };

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

    /*Function to create a new project*/
    $scope.createProject = function(showName, showGroup, showStatus, dt) {
        $scope.submitted = true;
        $scope.showName = showName;
        $scope.showGroup = showGroup;
        $scope.showStatus = showStatus;
        $scope.prodDate = dt.toDateString();
        if($scope.cGroup.$valid) {
            $http.post('api/projectshows', {showName: $scope.showName, showStatus: $scope.showStatus, group_id: $scope.showGroup ,prodDate: $scope.prodDate});
            alert("Project Created");
            $scope.newProject.$setPristine();
            $scope.createIsCollapsed = true;
        };
    };

    /*Opens modal dialog with new controller*/
    $scope.open = function(project) {
        var modalInstance = $modal.open({
            templateUrl: 'app/shows/view-project/view-project.html',
            controller: 'ViewProjectCtrl',
            size: "lg",
            resolve: {
                project: function () {
                    return project; 
                }
            }
        });
    };
});