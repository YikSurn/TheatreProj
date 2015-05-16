'use strict';

angular.module('theatreProjApp')
  .controller('ViewGroupCtrl', function ($scope, $http, socket, Auth, User, theatreGroups) {

    $scope.currGroup = theatreGroups.group;
   
    //Handles variable set ups for editors
    $scope.editorEnabledName = false;
    $scope.editorEnabledFaceBook = false;
    $scope.editorEnabledMedia = false;
    $scope.editorEnabledWebsite = false;

    //Handles variable set ups for button collapses
    $scope.userIsCollapsed=  true;
    $scope.viewIsCollapsed = true;
    $scope.assignIsCollapsed = true;
    $scope.completeIsCollapsed = true;
    
    //An array to store all group member names
    $scope.groupMembers = [];

    //Get all users
    $http.get('api/users').success(function(users) {
        $scope.users = users; 
        socket.syncUpdates('user', $scope.users)
    });

    //Function to get all groups
    $http.get('api/groups').success(function(groups) {
        $scope.groups = groups;
        $scope.getGroupNames();
        socket.syncUpdates('group', $scope.groups, function(event, group, groups) {
            $scope.getGroupNames();
        });
    });

    //Gets the name of each group and places into an array.
    $scope.getGroupNames = function() {
        var currGroup;
        $scope.groupNames = [];
        for(currGroup in $scope.groups) {
            $scope.groupNames[$scope.groupNames.length] = $scope.groups[currGroup].name;
        }
    }

    //Checks to see if group to be created already exists
    $scope.checkArray = function(value, array) {
        return array.indexOf(value) > -1;
    }

    //Displays editor for group names*/
    $scope.enableEditorName = function() {
        $scope.editorEnabledName = true;
        $scope.newName = $scope.currGroup.name;
    };

    //Displays editor for group Facebook details
    $scope.enableEditorFacebook = function() {
        $scope.editorEnabledFaceBook = true;
        $scope.newFacebook = $scope.currGroup.facebookURL;
    };

    //Displays editor for group Social Media details
    $scope.enableEditorMedia = function() {
        $scope.editorEnabledMedia = true;
        $scope.newMedia = $scope.currGroup.socialMediaURL;
    };

    //Displays editor for group Website details
    $scope.enableEditorWebsite = function() {
        $scope.editorEnabledWebsite = true;
        $scope.newWebsite = $scope.currGroup.websiteURL;
    };

    $scope.saveWebsite = function(website) {
        $scope.currWebsite = website;
        $scope.currGroup.websiteURL = $scope.currWebsite;
        $http.put('api/groups/' + $scope.currGroup._id, $scope.currGroup);
        $scope.disableEditor();
    };

    $scope.saveFacebook = function(facebook) {
        $scope.currFacebook = facebook;
        $scope.currGroup.facebookURL = $scope.currFacebook;
        $http.put('api/groups/' + $scope.currGroup._id, $scope.currGroup);
        $scope.disableEditor();
    };

    $scope.saveMedia = function(media) {
        $scope.currMedia = media;
        $scope.currGroup.socialMediaURL = $scope.currMedia;
        $http.put('api/groups/' + $scope.currGroup._id, $scope.currGroup);
        $scope.disableEditor();
    };

    //Display not provided fields
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

    //Get tasks for selected group and organize tasks into completed and incompleted
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

    //Get projects for selected group
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

    //Get meetings for selected group
    $scope.getMeetings = function() {
        var meeting;
        $scope.meetingData = true;
        $scope.gMeetings = [];  
        for (meeting in $scope.prodMeetings) {
            if ($scope.prodMeetings[meeting].group) {
                if ($scope.prodMeetings[meeting].group._id == $scope.currGroup._id) {
                    $scope.gMeetings[$scope.gMeetings.length] = $scope.prodMeetings[meeting];
                }
            } else {continue;}
        }
        if($scope.gMeetings.length === 0) {
            $scope.meetingData = false;
        }
    };

    //Get all tasks
    $http.get('api/tasks').success(function(tasks) {
        $scope.tasks = tasks;
        $scope.getTasks();
        socket.syncUpdates('task', $scope.tasks, function(event, task, tasks) {
            $scope.getTasks(); 
        });
    });

    //Get all production meetings
    $http.get('api/prodmeetings').success(function(prodmeetings) {
        $scope.prodMeetings = prodmeetings;
        $scope.getMeetings();
        socket.syncUpdates('prodmeeting', $scope.prodMeetings, function(event, prodmeeting, prodmeetings) {
            $scope.getMeetings();
        });
    });

    //Get all projects
    $http.get('api/projectshows').success(function(projectshows) {
        $scope.projectshows = projectshows;
        $scope.getProjects();
        socket.syncUpdates('projectshow', $scope.projectshows, function(event, projectshow, projectshows) {
            $scope.getProjects();
        });
    });

    //Function to save Group Name edits
    $scope.saveName = function() {
        $scope.submitted = true;
        if($scope.name.$valid) {
            if($scope.newName.indexOf('/') > -1 || $scope.newName.indexOf('?') > -1 || $scope.newName.indexOf('%') > -1) {
                alert("You have included illegal characters (/, ? or %) not permitted in group names. Please try a different name");
            } else if(!$scope.checkArray($scope.newName, $scope.groupNames)) {
                $scope.currName = $scope.newName;
                $scope.currGroup.name = $scope.currName;
                $http.put('api/groups/' + $scope.currGroup._id, $scope.currGroup);
                $scope.disableEditor();
            } else {
                alert($scope.newName + " already exists as a group name, please try a different name");
            }
        }
    };

    //Disables all editors
    $scope.disableEditor = function() {
        $scope.editorEnabledName = false;
        $scope.editorEnabledFaceBook = false;
        $scope.editorEnabledMedia = false;
        $scope.editorEnabledWebsite = false;
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

    //Checks to see if selected member is already in group
    $scope.checkArray = function(value, array) {
        return array.indexOf(value) > -1;
    }

    //Function to add member
    $scope.addMember = function(showUsers) {
        $scope.userSubmitted = true;
        if(showUsers) {
            $scope.memberToAdd = showUsers;
            if(!$scope.checkArray($scope.memberToAdd, $scope.currGroup.members)) {
                $scope.currGroup.members[$scope.currGroup.members.length] = $scope.memberToAdd;
                $http.put('api/groups/' + $scope.currGroup._id, $scope.currGroup);
                alert($scope.memberToAdd + " has been added to this group.");
                $window.location.reload()
            } else {
                alert($scope.memberToAdd + " is already in this group.");
            }
        };
    }

    //Function to remove group members
    $scope.removeMember = function(member) {
        var confRemove = confirm("Are you sure you want to remove " + member +" from this group?");
        if (confRemove == true) {
            $scope.position = $scope.currGroup.members.indexOf(member);
            $scope.currGroup.members.splice($scope.position, 1);
            $http.put('api/groups/' + $scope.currGroup._id, $scope.currGroup);
        }
    };

    //Function to assign a new task and checks if a project was selected.
    $scope.createTask = function(showProject, taskDesc, dt) {
        $scope.taskSubmitted = true;
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

    //Ensures date must be selected from todays date
    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    
    $scope.toggleMin();

    //Function to change task to complete
    $scope.changeStatus = function(task) {
        task.status = "Completed";
        $http.put('api/tasks/' + task._id, task);
    }

    //Function to delete a current task
    $scope.deleteTask = function(task) {
        var confTask = confirm("Are you sure you want to delete this task?");
        if (confTask == true) {
            $http.delete('api/tasks/' + task._id);
        }
    };

});