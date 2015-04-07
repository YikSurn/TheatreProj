'use strict';

angular.module('theatreProjApp')
  .controller('ProfileCtrl', function ($scope, Auth) {
  $scope.name = Auth.getCurrentUser().name;
  $scope.email = Auth.getCurrentUser().email;
  $scope.role = Auth.getCurrentUser().role;
  var user = Auth.getCurrentUser();
  $scope.user = user;
  $scope.editorEnabled = false;
  
  $scope.enableEditor = function() {
    $scope.editorEnabled = true;
    $scope.editableEmail = $scope.email;
  };
  
  $scope.disableEditor = function() {
    $scope.editorEnabled = false;
  };
  
  $scope.save = function() {
    $scope.email = $scope.editableEmail;
    user["email"] = $scope.email;
    $scope.disableEditor();
  };
});   
