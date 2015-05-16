'use strict';

angular.module('theatreProjApp')
  .controller('ShowsCtrl', function ($scope, Auth, $http, socket, $modal, $log) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.createIsCollapsed = true;

    //define all options for status'
    $scope.statusOptions = [{status: "Proposed"}, 
                            {status: "Planned"}, 
                            {status: "Confirmed"}, 
                            {status: "Underway"}, 
                            {status: "Concluded"}, 
                            {status: "Archive"}];

    //Get all projects and test to see if data is retrived
    $http.get('api/projectshows').success(function(projectshows) {
        $scope.projectshows = projectshows;
        $scope.testProjectData();
        //Ensure data is synched as updates are made
        socket.syncUpdates('projectshow', $scope.projectshows, function(event, projectshow, projectshows) {
            $scope.testProjectData();
        });
        $scope.projectsLoaded = true;
    });

    //Function checks if projects exist.
    $scope.testProjectData = function() {
        $scope.projectData = true;
        if($scope.projectshows.length === 0) {
            $scope.projectData = false;
        }
    };

    //Function to get all groups
    $http.get('api/groups').success(function(groups) {
        $scope.groups = groups;
        socket.syncUpdates('group', $scope.groups)
    });

    $scope.$on('$destroy', function(){
    	socket.unsyncUpdates('projectshow');
    });

    //Function to delete a project
    $scope.delete = function(project) {
    	var confprojectshow = confirm("Are you sure you want to delete " + project.showName + "?");
        if (confprojectshow == true) {
            $http.delete('api/projectshows/' + project._id);
        };
    };

    //Date Picker functions
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.toggleRange = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
      $scope.maxDate = $scope.maxDate ? null : new Date();
      $scope.maxDate.setMonth($scope.maxDate.getMonth()+6);
    };
    $scope.toggleRange();

    $scope.datep = {
      opened: false
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.datep.opened = true;
    };
    
    $scope.clear = function () {
      $scope.dt = null;
    };

    //Function to create a new project
    $scope.createProject = function() {
        $scope.submitted = true;
        if($scope.newProject.$valid) {
            $scope.prodDate = $scope.dt.toDateString();
            $http.post('api/projectshows', {prodDate: $scope.prodDate, showName: $scope.showName, showStatus: $scope.showStatus, group_id: $scope.showGroup});
            alert("Project Created");
            $scope.newProject.$setPristine();
            $scope.createIsCollapsed = true;
        }
    };

    //Opens modal dialog with new controller
    $scope.open = function(project) {
        var modalInstance = $modal.open({
            templateUrl: 'app/shows/view-project/view-project.html',
            controller: 'ViewProjectCtrl',
            size: "md",
            resolve: {
                project: function () {
                    return project; 
                }
            }
        });
    };
});