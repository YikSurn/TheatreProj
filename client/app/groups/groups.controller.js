'use strict';

angular.module('theatreProjApp')
  .controller('GroupsCtrl', function ($scope, Auth, $http, socket, $modal, $log) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.createIsCollapsed = true;
    $scope.groupsLoaded = false;

    //Function to get all groups
    $http.get('api/groups').success(function(groups) {
        $scope.groups = groups;
        $scope.getGroupNames();
        $scope.testGroupData();
        socket.syncUpdates('group', $scope.groups, function(event, group, groups) {
            $scope.getGroupNames();
            $scope.testGroupData();
        });
        $scope.groupsLoaded = true;
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

    //Function to test if groups exist
    $scope.testGroupData = function() {
        $scope.groupData = true;
        if($scope.groups.length === 0) {
            $scope.groupData = false;
        }
    };

    $scope.$on('$destroy', function() {
    	socket.unsyncUpdates('group');
    });

    //Function to create a group, checks illegal characters and if group already exists
    $scope.createGroup = function() {
        $scope.submitted = true;
        if($scope.cGroup.$valid) {
            if($scope.groupName.indexOf('/') > -1 || $scope.groupName.indexOf('?') > -1 || $scope.groupName.indexOf("%") > -1) {
                alert("You have included illegal characters (/, ? or %) not permitted in group names. Please try a different name");
            } else if(!$scope.checkArray($scope.groupName, $scope.groupNames)) {
                $scope.establishedDate = new Date();
                $http.post('api/groups', {name: $scope.groupName, websiteURL: $scope.websiteURL, facebookURL: $scope.facebookURL, socialMediaURL: $scope.mediaURL, establishedDate: $scope.establishedDate});
                alert("Group Created");
                $scope.createIsCollapsed = true;
            } else {
                alert($scope.groupName + " already exists as a group name, please try a different name");
            }
        };
    };

    //Function to delete a group
    $scope.delete = function(group) {
    	var confGroup = confirm("Are you sure you want to delete " + group.name + "?");
        if (confGroup == true) {
            $http.delete('api/groups/' + group._id);
        };
    };

    //Opens modal dialog with new controller (old method of displaying a group, no longer used.)
    $scope.open = function(group) {
        var modalInstance = $modal.open({
            templateUrl: 'app/groups/view-group/view-group.html',
            controller: 'ViewGroupCtrl',
            size: "lg",
            resolve: {
                group: function () {
                    return group; 
                }
            }
        });
    };
});