'use strict';

angular.module('theatreProjApp')
  .controller('ViewProjectCtrl', function ($scope, $modalInstance, $http, socket, Auth, project) {
    $scope.currProject = project;
    $scope.editorEnabledName = false;

    $scope.enableEditorName = function() {
      $scope.editorEnabledName = true;
      $scope.newName = $scope.currProject.showName;
    };

    $scope.disableEditor = function() {
      $scope.editorEnabledName = false;
    };

    $scope.saveName = function() {
      $scope.name.$setPristine();
      $scope.currName = $scope.newName;
      $scope.currProject.showName = $scope.currName;
      $http.put('api/projectshows/' + $scope.currProject._id, $scope.currProject);
      $scope.disableEditor();
    };

    $scope.close = function () {
        $modalInstance.close();
    };
});