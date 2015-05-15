'use strict';

angular.module('theatreProjApp')
  .controller('ProfileCtrl', function ($scope, User, Auth, $http, socket) {
    //Get current user data to help create/retrieve profile data.
    var user = Auth.getCurrentUser();
    $scope.user = user;
    
    /*The following is another method of retrieving profile data, had issues with it and went for a different method
    $scope.currProfile = "";
   
    Gets current profile
    $http.get('api/profiles/' + $scope.user._id).success(function(profile) {
      $scope.currProfile = profile;
      socket.syncUpdates('profile', $scope.currProfile);
    });

    if user profile does not exist create one
    if($scope.currProfile == "") {
      $scope.currProfile = {_id: $scope.user._id, name: $scope.user.name, email: $scope.user.email, role: $scope.user.role, addressTerm:'None Provided',addressHome:'None Provided',phone:'None Provided'};      
      $http.post('api/profiles', $scope.currProfile); 
    }*/

    //Get or create the current user profile using user, if the profile does not exist, create it
    $http.get('api/profiles').success(function(profiles) {
      $scope.profiles = profiles;
      var data = 'no data';
      var x;
      for (x in $scope.profiles) {
        if ($scope.profiles[x]._id === user._id) {
          data = $scope.profiles[x];
          {break;}
        }
      }
      $scope.currProfile = data;
      if ($scope.currProfile === 'no data') {
        $scope.currProfile = {_id: user._id, name: user.name, email: user.email, role: user.role, addressTerm:'None Provided',addressHome:'None Provided',phone:'None Provided'};      
        $http.post('api/profiles', $scope.currProfile);      
      }
      //Ensure changes to profiles are synched 
      socket.syncUpdates('profile', $scope.profiles);
    });
    
    $scope.$on('$destroy', function(){
    	socket.unsyncUpdates('profile');
    });

    //Function deletes a profile, this function is not currently in use.
    $scope.remove = function(profile) {
    	$http.delete('api/profiles/' + profile._id);
    };
  
    //Set up some variables to control the editors.
    $scope.editorEnabledEmail = false;
    $scope.editorEnabledPhone = false;
    $scope.editorEnabledHome = false;
    $scope.editorEnabledTerm = false;
  
    //The following functions allow editor toggles with "None Provided" being omitted to allow placeholders.  
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
  
    //Function to disable all editors. If a field is empty, ensure "None Provided" is displayed to the user.
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
  
    //The following functions will save any edits made by the user. All functions call disableEditor to ensure all editors are disabled.
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