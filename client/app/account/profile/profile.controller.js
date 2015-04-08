'use strict';

angular.module('theatreProjApp')
  .controller('ProfileCtrl', function ($scope, User, Auth, $http, socket) {
  $scope.name = Auth.getCurrentUser().name;
  $scope.email = Auth.getCurrentUser().email;
  $scope.phone = Auth.getCurrentUser().phone;
  $scope.home = Auth.getCurrentUser().addressHome;
  $scope.term = Auth.getCurrentUser().addressTerm;
  $scope.role = Auth.getCurrentUser().role;
  var user = Auth.getCurrentUser();
  $scope.user = user;
  
  $http.get('api/profiles').success(function(profiles) {
    $scope.profiles = profiles;
    socket.syncUpdates('profile', $scope.profiles);
  });

  $scope.$on('$destroy', function(){
   socket.unsyncUpdates('profile');
  });
  
  $scope.post = function() {
    $http.post('api/profiles', {name: "test"});
  };
  
  $scope.remove = function(profile) {
    $http.delete('api/profiles/' + profile._id);
  };
  
  for (profile in $scope.profiles) { 
    if (profile.name == $scope.name) {
      $scope.test = profile;
    };
  };
  
  $scope.editorEnabledEmail = false;
  $scope.editorEnabledPhone = false;
  $scope.editorEnabledHome = false;
  $scope.editorEnabledTerm = false;
  
  $scope.enableEditorEmail = function() {
    $scope.editorEnabledEmail = true;
    $scope.newEmail = $scope.email;
  };
  
  $scope.enableEditorPhone = function() {
    $scope.editorEnabledPhone = true;
    $scope.newPhone = $scope.phone;
  };
  
  $scope.enableEditorHome = function() {
    $scope.editorEnabledHome = true;
    $scope.newHome = $scope.home;
  };
  
  $scope.enableEditorTerm = function() {
    $scope.editorEnabledTerm = true;
    $scope.newTerm = $scope.term;
  };
  
  $scope.disableEditor = function() {
    $scope.editorEnabledPhone = false;
    $scope.editorEnabledEmail = false;
    $scope.editorEnabledHome = false;
    $scope.editorEnabledTerm = false;
  };
  
  $scope.saveEmail = function() {
    $scope.email = $scope.newEmail;
    user["email"] = $scope.email;
    $http.put('api/profiles', {name: $scope.name})
    $scope.disableEditor();
  };
  
  $scope.savePhone = function() {
    $scope.phone = $scope.newPhone;
    user["phone"] = $scope.phone;
    $scope.disableEditor();
  };
  
  $scope.saveHome = function() {
    $scope.home = $scope.newHome;
    user["addressHome"] = $scope.home;
    $scope.disableEditor();
  };
  
  $scope.saveTerm = function() {
    $scope.term = $scope.newTerm;
    user["addressTerm"] = $scope.term;
    $scope.disableEditor();
  };
});   
  
