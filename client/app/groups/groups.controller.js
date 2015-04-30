'use strict';

angular.module('theatreProjApp')
  .controller('GroupsCtrl', function ($scope, $http, socket, $modal, $log) {
    $scope.groupRows = [];

    var sliceGroupList = function(groups) {
        $scope.groupRows = [];
        var len = groups.length;
        var chunkSize = 3;
        for(var i = 0; i < len; i += chunkSize) {
            $scope.groupRows.push(groups.slice(i,i+chunkSize));
        }
        console.log($scope.groupRows);
    };

    $http.get('api/groups').success(function(groups) {
        $scope.groups = groups;
        sliceGroupList(groups);
        socket.syncUpdates('group', $scope.groups, function(event, group, groups) {
            sliceGroupList(groups);
        });
    });

    $scope.$on('$destroy', function(){
    	socket.unsyncUpdates('group');
    });

    $scope.post = function() {
        var names = ['Group name',
        'Lorem ipsum',
        'Search me',
        'Hi Mitchell',
        'Bootstrap is the best'];
    	$http.post('api/groups', {name: names[Math.floor(Math.random()*names.length)], members: ["hello", "test", "hi"]});
    };

    $scope.remove = function(group) {
    	$http.delete('api/groups/' + group._id);
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
    $scope.enableEditorName = function() {
      $scope.editorEnabledName = true;
      $scope.newName = $scope.currGroup.name;
    };

    $scope.getTasks = function() {
        var x;
        $scope.iTasks = [];
        $scope.cTasks = [];
        for (x in $scope.tasks) {
          if (($scope.tasks[x].assignedToUser_id === $scope.currGroup._id) && ($scope.tasks[x].status === "Incomplete")) {
            $scope.iTasks[$scope.iTasks.length] = $scope.tasks[x];
          } else if ($scope.tasks[x].assignedToUser_id === $scope.currGroup._id) {
            $scope.cTasks[$scope.cTasks.length] = $scope.tasks[x];
          }
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


    /*Function to save Group Name edits*/
    $scope.saveName = function() {
      $scope.name.$setPristine();
      $scope.name.$setUntouched();
      $scope.currName = $scope.newName;
      $scope.currGroup.name = $scope.currName;
      $http.put('api/groups/' + $scope.currGroup._id, $scope.currGroup);
      $scope.disableEditor();
    };

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
    $scope.createTask = function(taskDesc, dt) {
        $scope.taskDesc = taskDesc;
        $scope.deadline = dt;
        var user = Auth.getCurrentUser();
        $scope.user = user;
        $http.post('api/tasks', {description: $scope.taskDesc, deadline: $scope.deadline, assignedByUser_id: $scope.user.name, dateCreated: new Date(), assignedToUser_id: $scope.currGroup._id, status: "Incomplete"});
        alert("Task Created");
        $scope.assignTask.$setPristine();
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

    $scope.close = function () {
        $modalInstance.close();
    };
});