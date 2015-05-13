'use strict';

angular.module('theatreProjApp')
  .controller('ViewGroupCtrl', function ($scope, $modalInstance, $http, socket, Auth, User, group) {
    $scope.currGroup = group;
    $scope.editorEnabledName = false;
    $scope.userIsCollapsed=  true;
    $scope.viewIsCollapsed = true;
    $scope.assignIsCollapsed = true;
    $scope.completeIsCollapsed = true;
    $scope.groupMembers = [];

    $http.get('api/users').success(function(users) {
        $scope.users = users; 
        socket.syncUpdates('user', $scope.users)
    });
    

    /*Displays editor for group names*/
    $scope.enableEditorName = function() {
        $scope.editorEnabledName = true;
        $scope.newName = $scope.currGroup.name;
    };

    /*Display not provided fields*/
    $scope.providedCheck = function() {
        if(!$scope.currGroup.facebookURL) {
            $scope.currGroup.facebookURL = "None Provided";
        }
        if(!$scope.currGroup.socialMediaURL) {
            $scope.currGroup.socialMediaURL = "None Provided";
        }
        if(!$scope.currGroup.websiteURL) {
            $scope.currGroup.websiteURL = "None Provided";
        }
    }
    $scope.providedCheck();

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
        $scope.submitted = true;
        if($scope.name.$valid) {
            $scope.name.$setPristine();
            $scope.currName = $scope.newName;
            $scope.currGroup.name = $scope.currName;
            $http.put('api/groups/' + $scope.currGroup._id, $scope.currGroup);
            $scope.disableEditor();
        }
    };

    /*Disables editor for group names*/
    $scope.disableEditor = function() {
        $scope.editorEnabledName = false;
    };

    /*Function to get member names of users in group
    $scope.getNames = function() {
        if($scope.currGroup.members) {
            $scope.test = "hello";
            var position;
            var user;
            for(position in $scope.currGroup.members) {
                for(user in $scope.users) {
                    $scope.test = "hi";
                    if($scope.currGroup.members[position] === $scope.users[user]._id) {
                        $scope.test = "made it!";
                        $scope.groupMembers[$scope.groupMembers.length] = "hi";
                        {break;}
                    }
                }
            }
        } else {
            $scope.groupMembers = "This group does not have any members to show.";
        }
    }
    $scope.getNames();*/

    /*Function to add member*/
    $scope.addMember = function(showUsers) {
        $scope.userSubmitted = true;
        if(showUsers) {
            $scope.memberToAdd = showUsers;
            $scope.currGroup.members[$scope.currGroup.members.length] = $scope.memberToAdd;
            $http.put('api/groups/' + $scope.currGroup._id, $scope.currGroup);
            alert($scope.memberToAdd + " has been added to this group.");
        };
    }

    /*Function to remove group members*/
    $scope.removeMember = function(member) {
        var confRemove = confirm("Are you sure you want to remove " + member +" from this group?");
        if (confRemove == true) {
            $scope.position = $scope.currGroup.members.indexOf(member);
            $scope.currGroup.members.splice($scope.position, 1);
            $http.put('api/groups/' + $scope.currGroup._id, $scope.currGroup);
        }
    };

    /*Function to assign a new task*/
    $scope.createTask = function(showProject, taskDesc, dt) {
        $scope.showProject = showProject;
        $scope.taskDesc = taskDesc;
        $scope.deadline = dt.toDateString();
        if($scope.showProject) {
            $scope.show_id = $scope.showProject; 
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

    /*Function to delete a current task*/
    $scope.deleteTask = function(task) {
        var confTask = confirm("Are you sure you want to delete this task?");
        if (confTask == true) {
            $http.delete('api/tasks/' + task._id);
        }
    };

    /*Closes the modal dialog*/
    $scope.close = function () {
        $modalInstance.close();
    };
});