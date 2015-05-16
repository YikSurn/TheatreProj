'use strict';

angular.module('theatreProjApp')
  .controller('ViewProjectCtrl', function ($scope, $modalInstance, $http, socket, Auth, project) {
    $scope.currProject = project;
    $scope.editorEnabledName = false;

    /*Function to get all groups*/
    $http.get('api/groups').success(function(groups) {
        $scope.groups = groups;
        $scope.testGroupData();
        socket.syncUpdates('group', $scope.groups, function(event, group, groups) {
            $scope.testGroupData();
        });
        $scope.groupsLoaded = true;
    });

    /*Function to test if groups exist*/
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

    $scope.disableEditor = function() {
        $scope.editorEnabledName = false;
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

    $scope.close = function () {
        $modalInstance.close();
    };
});