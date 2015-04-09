'use strict';

angular.module('theatreProjApp')
  .controller('GroupsCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';

    $http.get('api/groups').success(function(groups) {
    	$scope.groups = groups;
        var data = "no data";
    	var x;
    	for (x in $scope.groups) {
          if ($scope.groups[x].name == "Hello") {
            data = $scope.groups[x];
            {break;}
          };
        };
        $scope.test = data;
        if ($scope.test == "no data") {
          $http.post('api/groups', {name: 'Hello'});
        };
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
