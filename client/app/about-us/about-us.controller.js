'use strict';

angular.module('theatreProjApp')
.controller('AboutUsCtrl', function ($scope, $window, $http) {
	/* independent variables */
	$scope.r = $(window).width() / 2; // radius of the carousel
	$scope.rotation = 0; // the current rotation of the carousel
	$scope.cubes = []; // the cube data (holding the group, etc)
	$scope.count = 0; // the number of cubes in the carousel
	$scope.currentCubeIndex = 0; // the index of the cube at the front
	var zShift = $scope.r * 1.5; // amt to push the carousel back into the screen

	/* The following style functions return a style object for the various
	parts of the carousel scene. Because of their dependence on dynamic scope
	variables, they cannot be placed in the scss file. */

	/* The container for everything. */
	$scope.carouselContainerStyle = function () {
		return {
			width: $scope.cubeLength + 'px',
			height: $scope.cubeLength + 'px'
		};
	};

	/* The carousel-translate div pushes the carousel back into the screen so we can see it. */
	$scope.carouselTranslateStyle = function () {
		var ret = {
			transform: ''
		}
		ret.transform += 'translateY(' + ($scope.r*0.15) + 'px)';
		ret.transform += ' translateZ(-' + zShift + 'px)';
		ret.transform += ' rotateX(-10deg)';
		return ret;
	};

	/* The style object for the floor. */
	$scope.floorStyle = function () {
		var w = $scope.r*3;
		var h = $scope.r*4;
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

	/* The style object for the left and right walls. */
	$scope.wallStyle = function (isLeft) {
		var w = $scope.r*4;
		var h = $scope.r;
		var ret = {
			width: w + 'px',
			height: h + 'px',
			'transform-origin': 'bottom left'
		};
		ret.transform = '';
		ret.transform = 'translateY(' + ($scope.cubeLength*1.1 - h) + 'px)'; // move it to floor level
		ret.transform += ' translateX(' + ($scope.cubeLength/2) + 'px)'; // centre it horizontally
		ret.transform += ' translateZ(-' + ($scope.cubeLength/2 + zShift) + 'px)'; // move it back into the screen
		var factor = isLeft? -1 : 1;
		ret.transform += ' translateX(' + (($scope.cubeLength + $scope.r)*factor) + 'px)'; // shift it sideways
		ret.transform += ' rotateY(-90deg)'; // rotate it
		return ret;
	};

	/* The style object for the back wall. */
	$scope.backWallStyle = function () {
		var w = $scope.r*4;
		var h = $scope.r;
		var ret = {
			width: w + 'px',
			height: h + 'px',
			'transform-origin': 'bottom left'
		};
		ret.transform = '';
		ret.transform = 'translateY(' + ($scope.cubeLength*1.1 - h) + 'px)'; // move it to floor level
		ret.transform += ' translateX(' + ($scope.cubeLength/2 - w/2) + 'px)'; // centre it horizontally
		ret.transform += ' translateZ(-' + ($scope.cubeLength/2 + zShift) + 'px)'; // move it back into the screen
		return ret;
	};

	/* Rotates the carousel, in response to user input, to display the selected cube at the front. */
	$scope.carouselStyle = function () {
		return {
			transform: 'rotateY(' + $scope.rotation + 'deg)'
		};
	};

	/* Pushes the cube out from the centre of the circle to its place in the ring. */
	$scope.cubeStyle = function (cubeIndex) {
		var ret = {
			transform: 'rotateY(' + cubeIndex*$scope.degDelta + 'deg) translateZ(' + $scope.r + 'px)'
		}
		return ret;
	};

	var cubeInactiveScaleFactor = 0.4; // the amount to scale inactive cubes by.

	/* Returns the appropriate style for a cube panel.
	@param cube the cube object.
	@param panel a string describing which panel is being styled.
	@param cubeIndex the cubeIndex, used to determine if the cube is active or not. */
	$scope.panelStyle = function (cube, panel, cubeIndex) {
		var ret = {
			width: $scope.cubeLength + 'px',
			height: $scope.cubeLength + 'px'
		}

		var len = $scope.cubeLength/2; // the cube half-length. defined here for conciseness, as it's used a lot.
		var active = cubeIndex == $scope.currentCubeIndex;
		if (!active) {
			len *= cubeInactiveScaleFactor;
		}

		switch (panel) {
			case 'front':
			ret['transform-origin'] = 'bottom';
			ret.transform = 'translateZ(' + len + 'px)'; // move it to the front of the cube
			if (active) {
				ret.transform += ' rotateX(-90deg)'; // unfold to lay flat
			}
			break;
			
			case 'back':
			ret['transform-origin'] = 'bottom';
			ret.transform = 'translateZ(-' + len + 'px)'; // move it to the back of the cube
			break;
			
			case 'top':
			ret['transform-origin'] = 'top';
			ret.transform = 'translateZ(-' + len + 'px)'; // move it to align with the back of the cube
			if (active) {
				ret.transform += ' rotateX(180deg)'; // unfold it to lay open
			} else {
				ret.transform += ' rotateX(90deg)'; // rotate it to lay flat
				ret.transform += ' translateZ(-' + ($scope.cubeLength - len * 2) + 'px)'; // shift it to align with the post-transformed cube
			}
			break;

			case 'bottom':
			ret['transform-origin'] = 'bottom';
			ret.transform = 'rotateX(-90deg)'; // rotate it to lay flat
			ret.transform += ' translateY(' + len + 'px)'; // move it to the bottom of the cube
			break;

			case 'left':
			ret['transform-origin'] = 'bottom right';
			if (active) {
				ret.transform = 'translateX(-' + (len * 2) + 'px)'; // move it to align with the left of the cube
				ret.transform += ' translateZ(-' + len + 'px)'; // move it to align with the back left edge of the cube
				ret.transform += ' rotateY(50deg)'; // unfold it a little
			} else {
				ret.transform = 'translateX(-' + ($scope.cubeLength/2 + len) + 'px)'; // move it to align with the left of the cube
				ret.transform += ' translateZ(-' + len + 'px)'; // move it to align with the back left edge of the post-transformed cube
				ret.transform += ' rotateY(90deg)'; // rotate it to lay flush
			}
			break;

			case 'right':
			ret['transform-origin'] = 'bottom left';
			if (active) {
				ret.transform = 'translateX(' + (len * 2) + 'px)'; // move it to align with the right of the cube
				ret.transform += ' translateZ(-' + len + 'px)'; // move it to align with the back right edge of the cube
				ret.transform += ' rotateY(-50deg)'; // unfold it a little
			} else {
				ret.transform = 'translateX(' + ($scope.cubeLength/2 + len) + 'px)'; // move it to align with the right of the cube
				ret.transform += ' translateZ(-' + len + 'px)'; // move it to align with the back right edge of the post-transformed cube
				ret.transform += ' rotateY(-90deg)'; // rotate it to lay flush
			}
			break;
		}

		if (!active) {
			// apply post transform
			ret.transform += ' scale(' + cubeInactiveScaleFactor + ')';
		}

		return ret;
	}

	/* Returns the appropriate style for the data presented in the active cube.
	@param cube the cube object.
	@param dataType a string describing which data attribute is being styled.
	@param cubeIndex the cubeIndex, used to determine if the cube is active or not. */
	$scope.dataStyle = function (cube, dataType, cubeIndex) {
		var ret = {
			'transform-origin': 'bottom'
		}

		var len = $scope.cubeLength/2; // the cube half-length. defined here for conciseness, as it's used a lot.
		var active = cubeIndex == $scope.currentCubeIndex;
		if (!active) {
			len *= cubeInactiveScaleFactor;
		}

		switch (dataType) {
			case 'info':
			ret.width = ($scope.cubeLength*4) + 'px';
			ret.height = ($scope.cubeLength*1) + 'px';
			ret.transform = 'translateX(-' + ($scope.cubeLength*1.5) + 'px)'; // centre it horizontally
			if (active) {
				ret.opacity = '1';
				ret.transform += ' translateZ(' + (len*3) + 'px)'; // move it forward a lot
				ret.transform += ' translateY(' + (len*0.5) + 'px)'; // move it down a bit
				ret.transform += ' rotateX(10deg)'; // rotate it back a bit
			} else {
				ret.opacity = '0';
				ret.transform += ' translateY(' + (len*2) + 'px)'; // move it down a bit
			}
			break;
		}

		if (!active) {
			// apply post transform
			ret.transform += ' scale(0.05)';
		}

		return ret;
	}

	/* Rotates the carousel to present the cube at currentCubeIndex at the front.
	@param cubeIndex the cubeIndex of the cube which should be presented. */
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

	/* Returns active if the cube at cubeIndex is the one at the front, inactive
	otherwise.
	@param cubeIndex the cubeIndex of the cube whose activity is being requested. */
	$scope.getActivityClass = function (cubeIndex) {
		return (cubeIndex == $scope.currentCubeIndex)? 'active' : 'inactive';
	};

	/* Initializes the carousel with a cube for each group in groups. */
	var init = function (groups) {
		$scope.cubes = [];
		var circumference = 2 * Math.PI * $scope.r;
		$scope.count = groups.length;
		$scope.cubeLength = circumference / $scope.count * 0.6;
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
