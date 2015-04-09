'use strict';

angular.module('theatreProjApp')
  .controller('ProfileCtrl', function ($scope, User, Auth, $http, socket) {
    var user = Auth.getCurrentUser();
    $scope.user = user;
   
    $http.get('api/profiles').success(function(profiles) {
      $scope.profiles = profiles;
      var data = "no data";
      var x;
      for (x in $scope.profiles) {
        if ($scope.profiles[x]._id == user._id) {
          data = $scope.profiles[x];
          {break;}
        };
      };
      $scope.currProfile = data;
      if ($scope.currProfile == "no data") {
      	$scope.currProfile = {_id: user._id, name: user.name, email: user.email, role: user.role, addressTerm:"None Provided",addressHome:"None Provided",phone:"None Provided"};      
        $http.post('api/profiles', $scope.currProfile);      
      };
      socket.syncUpdates('profile', $scope.profiles);
    });
    
    $scope.$on('$destroy', function(){
    	socket.unsyncUpdates('profile');
    });

    $scope.post = function() {
    	$http.post('api/profiles', {name: 'Hello'});
    };

    $scope.remove = function(profile) {
    	$http.delete('api/profiles/' + profile._id);
    };
  
    $scope.editorEnabledEmail = false;
    $scope.editorEnabledPhone = false;
    $scope.editorEnabledHome = false;
    $scope.editorEnabledTerm = false;
  
    $scope.enableEditorEmail = function() {
      $scope.editorEnabledEmail = true;
      $scope.newEmail = $scope.currProfile.email;
    };
  
    $scope.enableEditorPhone = function() {
      $scope.editorEnabledPhone = true;
      $scope.newPhone = $scope.currProfile.phone;
    };
  
    $scope.enableEditorHome = function() {
      $scope.editorEnabledHome = true;
      $scope.newHome = $scope.currProfile.addressHome;
    };
  
    $scope.enableEditorTerm = function() {
      $scope.editorEnabledTerm = true;
      $scope.newTerm = $scope.currProfile.addressTerm;
    }; 
  
    $scope.disableEditor = function() {
      $scope.editorEnabledPhone = false;
      $scope.editorEnabledEmail = false;
      $scope.editorEnabledHome = false;
      $scope.editorEnabledTerm = false;
    };
  
    $scope.saveEmail = function() {
      $scope.email = $scope.newEmail;
      $scope.user["email"] = $scope.email; 
      $scope.disableEditor();
    };
  
    $scope.savePhone = function() {
      $scope.phone = $scope.newPhone;
      $scope.currProfile["phone"] = $scope.phone;
      $http.put('api/profiles/' + $scope.currProfile._id, $scope.currProfile);
      $scope.disableEditor();
    };
  
    $scope.saveHome = function() {
      $scope.home = $scope.newHome;
      $scope.currProfile["addressHome"] = $scope.home;
      $http.put('api/profiles/' + $scope.currProfile._id, $scope.currProfile);
      $scope.disableEditor();
    };
  
    $scope.saveTerm = function() {
      $scope.term = $scope.newTerm;
      $scope.currProfile["addressTerm"] = $scope.term;
      $http.put('api/profiles/' + $scope.currProfile._id, $scope.currProfile);
      $scope.disableEditor();
    };
  });   
  
