'use strict';

angular.module('theatreProjApp')
  .controller('ViewProjectCtrl', function ($scope, $modalInstance, $http, socket, Auth, project) {
    $scope.thisProject = project;
    $scope.editorEnabledName = false;
    $scope.editorEnabledGroup = false;
    $scope.editorEnabledStatus = false;

    /*define all options for status'*/
    $scope.statusOptions = [{status: "Proposed"}, 
                            {status: "Planned"}, 
                            {status: "Confirmed"}, 
                            {status: "Underway"}, 
                            {status: "Concluded"}, 
                            {status: "Archive"}];

    //Function to get all groups
    $http.get('api/groups').success(function(groups) {
        $scope.groups = groups;
        $scope.getGroup();
        socket.syncUpdates('group', $scope.groups, function(event, group, groups) {
            $scope.getGroup();
        });
    });

    //Function to get all groups
    $http.get('api/projectshows').success(function(projectshows) {
        $scope.projectshows = projectshows;
        $scope.getProject();
        $scope.getGroup();
        socket.syncUpdates('projectshow', $scope.projectshows, function(event, projectshow, projectshows) {
            $scope.getProject();
            $scope.getGroup();
        });
    });

    //Function to get group assigned to project
    $scope.getProject = function() {
        var y;
        for (y in $scope.projectshows) {
            if ($scope.projectshows[y]._id === $scope.thisProject._id) {
                $scope.currProject = $scope.projectshows[y];
                {break;}
            }
        }
    };

    //Function to get group assigned to project
    $scope.getGroup = function() {
        var x;
        for (x in $scope.groups) {
            if ($scope.groups[x]._id === $scope.currProject.group_id) {
                $scope.projGroup = $scope.groups[x];
                {break;}
            }
        }
    };

    //Function to test if groups exist
    $scope.testGroupData = function() {
        $scope.groupData = true;
        if($scope.groups.length === 0) {
            $scope.groupData = false;
        }
    };

    $scope.enableEditorName = function() {
        $scope.editorEnabledName = true;
        $scope.newName = $scope.currProject.showName;
    };

    $scope.enableEditorGroup = function() {
        $scope.editorEnabledGroup = true;
        $scope.newGroup = $scope.projGroup.name;
    };

    $scope.enableEditorStatus = function() {
        $scope.editorEnabledStatus = true;
        $scope.newStatus = $scope.projGroup.status;
    };

    $scope.disableEditor = function() {
        $scope.editorEnabledName = false;
        $scope.editorEnabledGroup = false;
        $scope.editorEnabledStatus = false;
    };

    $scope.saveName = function() {
        $scope.submitted = true;
        if($scope.name.$valid) {
            $scope.name.$setPristine();
            $scope.currName = $scope.newName;
            $scope.currProject.showName = $scope.currName;
            $http.put('api/projectshows/' + $scope.currProject._id, $scope.currProject);
            $scope.disableEditor();
        }
    };

    $scope.changeGroup = function(newGroup) {
        $scope.currGroup = newGroup;
        $scope.currProject.group_id = $scope.currGroup;
        $http.put('api/projectshows/' + $scope.currProject._id, $scope.currProject);
        $scope.disableEditor();
    }

    $scope.changeStatus = function(newStatus) {
        $scope.currStatus = newStatus;
        $scope.currProject.showStatus = $scope.currStatus;
        $http.put('api/projectshows/' + $scope.currProject._id, $scope.currProject);
        $scope.disableEditor();
    }

    $scope.close = function () {
        $modalInstance.close();
    };
});