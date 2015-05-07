'use strict';

angular.module('theatreProjApp')
  .controller('GroupCtrl', function ($scope) {
    $scope.currGroup = group;
    $scope.editorEnabledName = false;
    $scope.viewIsCollapsed = true;
    $scope.assignIsCollapsed = true;
    $scope.completeIsCollapsed = true;
    
    /*Displays editor for group names*/
    $scope.enableEditorName = function() {
      $scope.editorEnabledName = true;
      $scope.newName = $scope.currGroup.name;
    };

    /*Get tasks for selected group and organize tasks into completed and incompleted*/
    $scope.getTasks = function() {
        var task;
        $scope.iTaskData = false;
        $scope.cTaskData = false;
        $scope.iTasks = [];
        $scope.cTasks = [];
        for (task in $scope.tasks) {
          if (($scope.tasks[task].assignedToUser_id === $scope.currGroup._id) && ($scope.tasks[task].status === "Incomplete")) {
            $scope.iTasks[$scope.iTasks.length] = $scope.tasks[task];
            $scope.iTaskData = true;
          } else if ($scope.tasks[task].assignedToUser_id === $scope.currGroup._id) {
            $scope.cTasks[$scope.cTasks.length] = $scope.tasks[task];
            $scope.cTaskData = true;
          }
        }
    };

    /*Get projects for selected group*/
    $scope.getProjects = function() {
        var proj;
        $scope.projectData = true;
        $scope.gProjects = [];  
        for (proj in $scope.projectshows) {
          if (($scope.projectshows[proj].group_id === $scope.currGroup._id)) {
            $scope.gProjects[$scope.gProjects.length] = $scope.projectshows[proj];
          }
        }
        if($scope.gProjects.length === 0) {
            $scope.projectData = false;
        }
    };

    /*Get all tasks*/
    $http.get('api/tasks').success(function(tasks) {
        $scope.tasks = tasks;
        $scope.getTasks();
        socket.syncUpdates('task', $scope.tasks, function(event, task, tasks) {
            $scope.getTasks(); 
        });
    });

    /*Get all projects*/
    $http.get('api/projectshows').success(function(projectshows) {
        $scope.projectshows = projectshows;
        $scope.getProjects();
        socket.syncUpdates('projectshow', $scope.projectshows, function(event, projectshow, projectshows) {
            $scope.getProjects();
        });
    });

    /*Function to save Group Name edits*/
    $scope.saveName = function() {
      $scope.name.$setPristine();
      $scope.currName = $scope.newName;
      $scope.currGroup.name = $scope.currName;
      $http.put('api/groups/' + $scope.currGroup._id, $scope.currGroup);
      $scope.disableEditor();
    };

    /*Disables editor for group names*/
    $scope.disableEditor = function() {
      $scope.editorEnabledName = false;
    };

    /*Function to remove group members*/
    $scope.removeMember = function(member) {
        $scope.position = $scope.currGroup.members.indexOf(member);
        $scope.currGroup.members.splice($scope.position, 1);
        $http.put('api/groups/' + $scope.currGroup._id, $scope.currGroup);
    };

    /*Function to assign a new task*/
    $scope.createTask = function(taskDesc, dt, showProject) {
        $scope.taskDesc = taskDesc;
        $scope.deadline = dt.toDateString();
        if(showProject) {
            $scope.show_id = showProject; 
        } else {
            $scope.show_id = "No project assigned";
        }
        var user = Auth.getCurrentUser();
        $scope.user = user;
        $http.post('api/tasks', {description: $scope.taskDesc, deadline: $scope.deadline, assignedByUser_id: $scope.user.name, dateCreated: new Date(), assignedToUser_id: $scope.currGroup._id, status: "Incomplete", show_id: $scope.show_id});
        alert("Task Created");
    };

    /*Ensures date must be selected from todays date*/
    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    /*Function to change task to complete*/
    $scope.changeStatus = function(task) {
        task.status = "Completed";
        $http.put('api/tasks/' + task._id, task);
    }

    /*Function to remove a current task*/
    $scope.removeTask = function(task) {
        var confTask = confirm("Are you sure you want to remove this task?");
        if (confTask == true) {
            $http.delete('api/tasks/' + task._id);
        }
    };

    /*Closes the modal dialog*/
    $scope.close = function () {
        $modalInstance.close();
    };
});