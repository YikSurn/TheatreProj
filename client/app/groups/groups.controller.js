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

    /*Opens modal dialog with new controller*/
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