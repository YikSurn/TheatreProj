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

angular.module('theatreProjApp')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, socket, group) {
    $scope.currGroup = group;
    $scope.editorEnabledName = false;
    $scope.enableEditorName = function() {
      $scope.editorEnabledName = true;
      $scope.newName = $scope.currGroup.name;
    };

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

    $scope.removeMember = function(member) {
        var position = group.members.indexOf(member);
        group.members.splice(position, 1);
        $http.put('api/groups/' + group._id, group);
    };

    $scope.close = function () {
        $modalInstance.close();
    };
});