'use strict';

angular.module('theatreProjApp')
.controller('AddRequestCtrl', function ($scope, $modalInstance, $http, groupsInRange, range) {
	$http.get('api/groups').success(function(groups) {
		var toRemove = [];
		for (var i = 0; i < groupsInRange.length; i++) {
			var groupInRange = groupsInRange[i];

			for (var j = 0; j < groups.length; j++) {
				var group = groups[j];

				if (group._id == groupInRange._id) {
					toRemove.push(group);
				}
			}
		}
		for (var i = 0; i < toRemove.length; i++) {
			var index = groups.indexOf(toRemove[i]);
			groups.splice(index, 1);
		};

		$scope.groups = groups;
	});

	$scope.select = function (group) {
		$scope.selectedGroup = group;
	};

	$scope.selectedGroup = null;
	$scope.range = range;
	$scope.dateFormat = 'MMM d';

	$scope.ok = function () {
		$modalInstance.close($scope.selectedGroup);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
