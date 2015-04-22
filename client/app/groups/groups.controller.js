'use strict';

angular.module('theatreProjApp')
  .controller('GroupsCtrl', function ($scope, $http, socket) {
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
    	$http.post('api/groups', {name: names[Math.floor(Math.random()*names.length)]});
    };

    $scope.remove = function(group) {
    	$http.delete('api/groups/' + group._id);
    };
    
  });
