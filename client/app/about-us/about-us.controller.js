'use strict';

angular.module('theatreProjApp')
.controller('AboutUsCtrl', function ($scope, $window, $http) {
	/* independent variables */
	$scope.r = $(window).width() / 2;
	$scope.rotation = 0;
	$scope.count = 0;
	$scope.cubes = [];
	$scope.currentCubeIndex = 0;

	/* The following functions return a style object for the various
	parts of the carousel. Because of their dependence on dynamic scope
	variables, they cannot be placed in the scss file. */
	$scope.carouselContainerStyle = function () {
		return {
			width: $scope.cubeLength + 'px',
			height: $scope.cubeLength + 'px'
		};
	};

	var zShift = $scope.r * 1.5; // amt to push the carousel back into the screen

	$scope.carouselTranslateStyle = function () {
		return {
			transform: 'translateZ(-' + zShift + 'px) rotateX(-10deg)'
		}
	};

	$scope.floorStyle = function () {
		var w = $scope.cubeLength*16;
		var h = $scope.cubeLength*10;
		var ret = {
			width: w + 'px',
			height: h + 'px',
			'transform-origin': 'top center'
		};
		ret.transform = 'translateY(' + $scope.cubeLength*1.1 + 'px)'; // move it to floor level
		ret.transform += ' translateX(' + ($scope.cubeLength/2 - w/2) + 'px)'; // centre it horizontally
		ret.transform += ' translateZ(-' + ($scope.cubeLength/2 + zShift) + 'px)'; // move it back into the screen
		ret.transform += ' rotateX(90deg)'; // rotate it so it's flat
		return ret;
	};

	$scope.carouselStyle = function () {
		return {
			transform: 'rotateY(' + $scope.rotation + 'deg)'
		};
	};

	/* Rotates the carousel to present the cube at currentCubeIndex at the front. */
	$scope.switchTo = function (cubeIndex) {
		if (cubeIndex === $scope.currentCubeIndex) {
			return;
		}

		var indexDelta = Math.abs($scope.currentCubeIndex - cubeIndex);
		var directionFactor = (cubeIndex > $scope.currentCubeIndex)? 1 : -1;

		if (indexDelta > $scope.count/2) {
			indexDelta = $scope.count - indexDelta;
			directionFactor *= -1;
		}

		$scope.rotation -= indexDelta * $scope.degDelta * directionFactor;
		$scope.currentCubeIndex = cubeIndex;
	};

	$scope.getActivityClass = function ($index) {
		return ($index == $scope.currentCubeIndex)? 'active' : 'inactive';
	};

	$scope.cubeStyle = function (cubeIndex) {
		var ret = {
			transform: 'rotateY(' + cubeIndex*$scope.degDelta + 'deg) translateZ(' + $scope.r + 'px)'
		}
		return ret;
	};

	$scope.panelStyle = function (cube, panel, $index) {
		var ret = {
			width: $scope.cubeLength + 'px',
			height: $scope.cubeLength + 'px'
		}

		var len = $scope.cubeLength/2;
		var postTransform = ' scale(1.0)';

		var active = $index == $scope.currentCubeIndex;

		if (!active) {
			postTransform = ' scale(0.3)';
			len *= 0.3;
		}

		switch (panel) {
			case 'front':
			ret['transform-origin'] = 'bottom';
			if (active) {
				ret.transform = 'translateZ(' + len + 'px) rotateX(-90deg)' + postTransform;
			} else {
				ret.transform = 'translateZ(' + len + 'px)' + postTransform;
			}
			break;
			
			case 'back':
			ret['transform-origin'] = 'bottom';
			ret.transform = 'translateZ(-' + len + 'px)' + postTransform;
			break;
			
			case 'top':
			ret['transform-origin'] = 'top';
			if (active) {
				ret.transform = 'translateZ(-' + len + 'px) rotateX(180deg)' + postTransform;
			} else {
				ret.transform = 'translateZ(-' + len + 'px) rotateX(90deg) translateZ(-' + ($scope.cubeLength - len * 2) + 'px)' + postTransform;
			}
			break;

			case 'bottom':
			ret['transform-origin'] = 'bottom';
			ret.transform = 'rotateX(-90deg) translateY(' + len + 'px)' + postTransform;
			break;

			case 'left':
			ret['transform-origin'] = 'bottom right';
			if (active) {
				ret.transform = 'translateX(-' + (len * 2) + 'px) translateZ(-' + len + 'px) rotateY(60deg)' + postTransform;
			} else {
				ret.transform = 'translateX(-' + ($scope.cubeLength/2 + len) + 'px) translateZ(-' + len + 'px) rotateY(90deg)' + postTransform;
			}
			break;

			case 'right':
			ret['transform-origin'] = 'bottom left';
			if (active) {
				ret.transform = 'translateX(' + (len * 2) + 'px) translateZ(-' + len + 'px) rotateY(-60deg)' + postTransform;
			} else {
				ret.transform = 'translateX(' + ($scope.cubeLength/2 + len) + 'px) translateZ(-' + len + 'px) rotateY(-90deg)' + postTransform;
			}
			break;
		}

		return ret;
	}

	$scope.dataStyle = function (cube, dataType, $index) {
		var ret = {
			'transform-origin': 'bottom'
		}

		var len = $scope.cubeLength/2;
		var postTransform = ' scale(1.0)';

		var active = $index == $scope.currentCubeIndex;
		if (!active) {
			postTransform = ' scale(0.1)';
			len *= 0.3;
		}

		switch (dataType) {
			case 'info':
			ret.width = ($scope.cubeLength*4) + 'px';
			ret.height = ($scope.cubeLength*0.6) + 'px';
			if (active) {
				ret.transform = 'translateX(-' + ($scope.cubeLength*1.5) + 'px) translateZ(' + (len*3) + 'px) translateY(' + (len*1.5) + 'px) rotateX(10deg)' + postTransform;
			} else {
				ret.transform = 'translateX(-' + ($scope.cubeLength*1.5) + 'px) translateY(' + (len*2) + 'px)' + postTransform;
			}
			break;
		}

		return ret;
	}

	/* Initializes the carousel with a cube for each group in groups. */
	var init = function (groups) {
		$scope.cubes = [];
		var circumference = 2 * Math.PI * $scope.r;
		$scope.count = groups.length;
		$scope.cubeLength = circumference / $scope.count * 0.8;
		$scope.degDelta = 360 / $scope.count;

		for (var i = 0; i < $scope.count; i++) {
			var cube = {};
			cube.group = groups[i];
			$scope.cubes.push(cube);
		};
		$scope.switchTo($scope.currentCubeIndex);
	};

	/* ----------------- init ----------------- */

	$http.get('api/aboutusgroups').success(function (groups) {
		init(groups);
	});
});
