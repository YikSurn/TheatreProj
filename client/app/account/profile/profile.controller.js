'use strict';

angular.module('theatreProjApp')
  .controller('ProfileCtrl', function ($scope, User, Auth, $http, socket) {
    var user = Auth.getCurrentUser();
    $scope.user = user;
    $scope.currProfile = "";
   
    /*Gets current profile*/
    $http.get('api/profiles/' + $scope.user._id).success(function(profile) {
      $scope.currProfile = profile;
      socket.syncUpdates('profile', $scope.currProfile);
    });

    /*if user profile does no exist create one*/
    if($scope.currProfile == "") {
      $scope.test = "hello"
      $scope.currProfile = {_id: $scope.user._id, name: $scope.user.name, email: $scope.user.email, role: $scope.user.role, addressTerm:'None Provided',addressHome:'None Provided',phone:'None Provided'};      
      $http.post('api/profiles', $scope.currProfile); 
    }
    
    $scope.$on('$destroy', function(){
    	socket.unsyncUpdates('profile');
    });

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
      if($scope.currProfile.addressHome === "None Provided") {
        $scope.currProfile.addressHome = "";
      }
      $scope.newHome = $scope.currProfile.addressHome;
    };
  
    $scope.enableEditorTerm = function() {
      $scope.editorEnabledTerm = true;
            if($scope.currProfile.addressTerm === "None Provided") {
        $scope.currProfile.addressTerm = "";
      }
      $scope.newTerm = $scope.currProfile.addressTerm;
    }; 
  
    $scope.disableEditor = function() {
      $scope.editorEnabledPhone = false;
      $scope.editorEnabledEmail = false;
      $scope.editorEnabledHome = false;
      if($scope.currProfile.addressHome === "") {
        $scope.currProfile.addressHome = "None Provided";
      }
      $scope.editorEnabledTerm = false;
      if($scope.currProfile.addressTerm === "") {
        $scope.currProfile.addressTerm = "None Provided";
      }
    };
  
    $scope.saveEmail = function() {
      $scope.emailSubmitted = true;
      if($scope.email.$valid) {
        $scope.email.$setPristine();
        $scope.currEmail = $scope.newEmail;
        $scope.currProfile.email = $scope.currEmail;
        $scope.disableEditor();
      };
    };
  
    $scope.savePhone = function() {
      $scope.phoneSubmitted = true;
      if($scope.phone.$valid) {
        $scope.phone.$setPristine();
        $scope.currPhone = $scope.newPhone;
        $scope.currProfile.phone = $scope.currPhone;
        $http.put('api/profiles/' + $scope.currProfile._id, $scope.currProfile);
        $scope.disableEditor();
      };
    };
  
    $scope.saveHome = function() {
      $scope.homeSubmitted = true;
      if($scope.home.$valid) {
        $scope.home.$setPristine();
        $scope.currHome = $scope.newHome;
        $scope.currProfile.addressHome = $scope.currHome;
        $http.put('api/profiles/' + $scope.currProfile._id, $scope.currProfile);
        $scope.disableEditor();
      };
    };
  
    $scope.saveTerm = function() {
      $scope.termSubmitted = true;
      if($scope.term.$valid) {
        $scope.term.$setPristine();
        $scope.currTerm = $scope.newTerm;
        $scope.currProfile.addressTerm = $scope.currTerm;
        $http.put('api/profiles/' + $scope.currProfile._id, $scope.currProfile);
        $scope.disableEditor();
      };
    };
  });   
  
