'use strict';

angular.module('theatreProjApp')
  .controller('GroupsCtrl', function ($scope, Auth, $http, socket, $modal, $log) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.createIsCollapsed = true;
    $scope.groupsLoaded = false;

    /*Function to get all groups*/
    $http.get('api/groups').success(function(groups) {
        $scope.groups = groups;
        $scope.testGroupData();
        socket.syncUpdates('group', $scope.groups, function(event, group, groups) {
            $scope.testGroupData();
        });
        $scope.groupsLoaded = true;
    });

    $scope.testGroupData = function() {
        $scope.groupData = true;
        if($scope.groups.length === 0) {
            $scope.groupData = false;
        }
    };

    $scope.$on('$destroy', function() {
    	socket.unsyncUpdates('group');
    });

    /*Function to create a group*/
    $scope.createGroup = function() {
        $scope.submitted = true;
        if($scope.cGroup.$valid) {
            $http.post('api/groups', {name: $scope.groupName, websiteURL: $scope.websiteURL, facebookURL: $scope.facebookURL, socialMediaURL: $scope.mediaURL});
            alert("Group Created");
            $scope.createIsCollapsed = true;
        };
    };

    /*Function to delete a group*/
    $scope.remove = function(group) {
    	var confGroup = confirm("Are you sure you want to remove " + group.name + "?");
        if (confGroup == true) {
            $http.delete('api/groups/' + group._id);
        };
    };

    /*Opens Modal Dialog with new controller*/
    $scope.open = function (group) {

        var modalInstance = $modal.open({
            templateUrl: 'groupViewModal.html',
            controller: 'ModalInstanceCtrl',
            size: "lg",
            resolve: {
                group: function () {
                    return group; 
                }
            }
        });
    };
});

/*Controller for modal dialog*/
angular.module('theatreProjApp')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, socket, Auth, group) {
    
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
        var x;
        $scope.iTaskData = false;
        $scope.cTaskData = false;
        $scope.iTasks = [];
        $scope.cTasks = [];
        for (x in $scope.tasks) {
          if (($scope.tasks[x].assignedToUser_id === $scope.currGroup._id) && ($scope.tasks[x].status === "Incomplete")) {
            $scope.iTasks[$scope.iTasks.length] = $scope.tasks[x];
            $scope.iTaskData = true;
          } else if ($scope.tasks[x].assignedToUser_id === $scope.currGroup._id) {
            $scope.cTasks[$scope.cTasks.length] = $scope.tasks[x];
            $scope.cTaskData = true;
          }
        }
    };

    /*Get projects for selected group*/
    $scope.getProjects = function() {
        var y;
        $scope.projectData = true;
        $scope.gProjects = [];  
        for (y in $scope.projectshows) {
          if (($scope.projectshows[y].group_id === $scope.currGroup._id)) {
            $scope.gProjects[$scope.gProjects.length] = $scope.projectshows[y];
          }
        }
        if($scope.gProjects.length === 0) {
            $scope.projectData = false;
            $scope.gProjects = "No Projects";
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