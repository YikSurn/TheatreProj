'use strict';

angular.module('0010FullstackMongoApp')
  .controller('GroupsCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';

    $http.get('api/groups').success(function(groups) {
    	$scope.groups = groups;
    	socket.syncUpdates('group', $scope.groups);
    });

    $scope.$on('$destroy', function(){
    	socket.unsyncUpdates('group');
    });

    $scope.post = function() {
    	$http.post('api/groups', {name: 'Hello'});
    };

    $scope.remove = function(group) {
    	$http.delete('api/groups/' + group._id);
    };
  });
