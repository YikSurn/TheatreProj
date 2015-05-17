'use strict';

angular.module('theatreProjApp')
  .controller('IndividualCtrl', function ($scope, $http, $modalInstance, user, Auth, socket) {
    $scope.currUser = user;
    $scope.currentAdmin = Auth.getCurrentUser();
    $http.get('api/profiles').success(function(profiles) {
      $scope.profiles = profiles;
      var data = 'no data';
      var x;
      for (x in $scope.profiles) {
        if ($scope.profiles[x]._id === $scope.currUser._id) {
          data = $scope.profiles[x];
          {break;}
        }
      }
      $scope.currProfile = data;
      if ($scope.currProfile === 'no data') {
        $scope.currProfile = {_id: $scope.currUser._id, name: $scope.currUser.name, email: $scope.currUser.email, role: $scope.currUser.role, addressTerm:'None Provided',addressHome:'None Provided', phone:'None Provided'};      
        $http.post('api/profiles', $scope.currProfile);      
      }else{
        $scope.currEmail=$scope.newEmail=$scope.currProfile.email;
        $scope.currPhone=$scope.newPhone=$scope.currProfile.phone;
        $scope.currHome=$scope.newHome=$scope.currProfile.addressHome;
        $scope.currTerm=$scope.newTerm=$scope.currProfile.addressTerm;
      }
      socket.syncUpdates('profile', $scope.profiles);
    });
    $http.get('api/tasks').success(function(tasks) {
      $scope.tasks = tasks;
      var data = [];
      var x;
      for (x in $scope.tasks) {
        if ($scope.tasks[x].assignedToUser_id === $scope.currUser._id) {
          data.push($scope.tasks[x]);
        }
      }
      $scope.currUserTasks = data;
      if(data.length>0)
        $scope.noTask=false;
      else
        $scope.noTask=true;
      socket.syncUpdates('task', $scope.tasks);
    });
    $scope.editorEnabledEmail = false;
    $scope.editorEnabledPhone = false;
    $scope.editorEnabledHome = false;
    $scope.editorEnabledTerm = false;
    $scope.createNewTask = true;
    $scope.editorEnabledTask = true;
    $scope.editorEnabledComments = true;
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
    $scope.enableEditorTask = function(task) {
      $scope.editorEnabledTask = false;
      $scope.newDescription = task.description;
      var date = $scope.dateFormatTransform(task.deadline);
      date = date.split("-");
      $scope.newDeadline = new Date(date[0],date[1]-1,date[2]);
      $scope.currTask = task;
    };
    $scope.enableEditorComments = function(task) {
      $scope.editorEnabledComments = false;
      $scope.newComments = "";
      $scope.currTask = task;
    };
    $scope.disableEditor = function() {
      $scope.editorEnabledPhone = false;
      $scope.editorEnabledEmail = false;
      $scope.editorEnabledHome = false;
      $scope.editorEnabledComments = true;
      $scope.editorEnabledTask = true;
      if($scope.currProfile.addressHome === "") {
        $scope.currProfile.addressHome = "None Provided";
      }
      $scope.editorEnabledTerm = false;
      if($scope.currProfile.addressTerm === "") {
        $scope.currProfile.addressTerm = "None Provided";
      }
    };

    $scope.toggleTaskCreate = function(){
      $scope.createNewTask = !$scope.createNewTask;
      if($scope.createNewTask==true){
          $scope.description = "";
          $scope.comments = "";
          $scope.dt= new Date();
      }
    };
  
    $scope.saveEmail = function(form,newEmail) {
      $scope.emailSubmitted = true;
      if(form.$valid) {
        form.$setPristine();
        $scope.currEmail = $scope.newEmail = newEmail;
        $scope.currProfile.email = $scope.currEmail;
        $scope.disableEditor();
      };
    };
    
    $scope.savePhone = function(form,newPhone) {
      $scope.phoneSubmitted = true;
      if(form.$valid) {
        form.$setPristine();
        $scope.currPhone = $scope.newPhone = newPhone;
        $scope.currProfile.phone = $scope.currPhone;
        $http.put('api/profiles/' + $scope.currProfile._id, $scope.currProfile);
        $scope.disableEditor();
      };
    };
  
    $scope.saveHome = function(form,newHome) {
      $scope.homeSubmitted = true;
      if(form.$valid) {
        form.$setPristine();
        $scope.currHome = $scope.newHome = newHome;
        $scope.currProfile.addressHome = $scope.currHome;
        $http.put('api/profiles/' + $scope.currProfile._id, $scope.currProfile);
        $scope.disableEditor();
      };
    };
  
    $scope.saveTerm = function(form, newTerm) {
      $scope.termSubmitted = true;
      if(form.$valid) {
        form.$setPristine();
        $scope.currTerm = $scope.newTerm = newTerm;
        $scope.currProfile.addressTerm = $scope.currTerm;
        $http.put('api/profiles/' + $scope.currProfile._id, $scope.currProfile);
        $scope.disableEditor();
      };
    };
    
    $scope.close = function () {
        $modalInstance.close();
    };
    //task operation
    $scope.saveTask = function(form,ndescription,ncomments,ndate){
      $scope.taskSubmitted = true;
      if(form.$valid){
        $scope.description = ndescription;
        $scope.comments = ncomments;
        $scope.dt = ndate;
        $http.post('api/tasks',{description:ndescription,assignedToUser_id:$scope.currUser._id,assignedByUser_id:$scope.currentAdmin._id,deadline:ndate,status:"Incomplete",comments:ncomments,dateCreated:new Date()});
        $scope.createNewTask = true;
      }
    };
    $scope.getName = function(id){
      var x;
      for (x in $scope.profiles) {
        if ($scope.profiles[x]._id === id) {
          return $scope.profiles[x].name;
        }
      }
      return false;
    };

    $scope.dateFormatTransform = function(time){
      if((typeof time)=="string"){
        var date = time.split("T");
        return date[0];
      }else{
        return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
      }
    };

    $scope.commentTask = function(task,newComments){
      task.comments = newComments;
      $http.put('api/tasks/' + task._id, task);
      $scope.editorEnabledComments = true;
    };

    $scope.modifyTask = function(form,task,newDescription,newDeadline){
      $scope.modifySubmitted = true;
      if(form.$valid){
        form.$setPristine();
        task.description = newDescription;
        newDeadline.setHours(17);
        task.deadline = newDeadline;
        $http.put('api/tasks/' + task._id, task);
        console.log(task);
        $scope.editorEnabledTask = true;
      }
    };
    $scope.deleteTask = function(task){
      var confTask = confirm("Are you sure you want to delete this task?");
        if (confTask == true) {
            $http.delete('api/tasks/' + task._id);
      };
    };
    $scope.completeTask = function(task){
      task.status = "Complete";
      $http.put('api/tasks/' + task._id, task);
    }
    //the date picker
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
  });
