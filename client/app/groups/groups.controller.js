'use strict';

angular.module('theatreProjApp')
  .controller('GroupsCtrl', function ($scope, $http, socket) {
    $http.get('api/groups').success(function(groups) {
        $scope.groups = groups;
        socket.syncUpdates('group', $scope.groups);
    });

    $scope.$on('$destroy', function(){
    	socket.unsyncUpdates('group');
    });

    $scope.newGroupName = "";

    $scope.createGroupActive = function() {
        if ($scope.newGroupName == "") {return false;};
        for (var i = 0; i < $scope.groups.length; i++) {
            var group = $scope.groups[i];
            if ($scope.newGroupName == group.Name) {return false;};
        };
        return true;
    };

    $scope.createGroup = function() {
    	$http.post('api/groups', {Name: $scope.newGroupName});
        $scope.newGroupName = "";
    };

    $scope.remove = function(group) {
    	$http.delete('api/groups/' + group._id);
    };
    
  });
