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
				height: $scope.cubeLength + 'px',
			};
		};

		$scope.carouselTranslateStyle = function () {
			return {
				transform: 'translateZ(-' + $scope.r + 'px)'
			}
		};

		$scope.carouselStyle = function () {
			return {
				transform: 'rotateX(-5deg) rotateY(' + $scope.rotation + 'deg)'
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

		/* Initializes the carousel with a cube for each group in groups. */
		var init = function (groups) {
			$scope.cubes = [];
			var circumference = 2 * Math.PI * $scope.r;
			$scope.count = groups.length;
			$scope.cubeLength = circumference / $scope.count / 4;
			$scope.degDelta = 360 / $scope.count;

			for (var i = 0; i < $scope.count; i++) {
				var cube = {};
				cube.cubeStyle = {
					transform: 'rotateY(' + i*$scope.degDelta + 'deg) translateZ(' + $scope.r + 'px)'
				};

				/* note: could use a prototype object for the following objects, but it ends up being more
				lines of code than just repeating the width and height :P */
				cube.frontStyle = {
					width: $scope.cubeLength + 'px',
					height: $scope.cubeLength + 'px',
					transform: 'translateZ(' + $scope.cubeLength/2 + 'px)'
				};
				cube.backStyle = {
					width: $scope.cubeLength + 'px',
					height: $scope.cubeLength + 'px',
					transform: 'rotateY(180deg) translateZ(' + $scope.cubeLength/2 + 'px)'
				};
				cube.topStyle = {
					width: $scope.cubeLength + 'px',
					height: $scope.cubeLength + 'px',
					transform: 'rotateX(90deg) translateZ(' + $scope.cubeLength/2 + 'px)'
				};
				cube.bottomStyle = {
					width: $scope.cubeLength + 'px',
					height: $scope.cubeLength + 'px',
					transform: 'rotateX(-90deg) translateZ(' + $scope.cubeLength/2 + 'px)'
				};
				cube.leftStyle = {
					width: $scope.cubeLength + 'px',
					height: $scope.cubeLength + 'px',
					transform: 'rotateY(-90deg) translateZ(' + $scope.cubeLength/2 + 'px)'
				};
				cube.rightStyle = {
					width: $scope.cubeLength + 'px',
					height: $scope.cubeLength + 'px',
					transform: 'rotateY(90deg) translateZ(' + $scope.cubeLength/2 + 'px)'
				};
				cube.group = groups[i];
				$scope.cubes.push(cube);
			};
			$scope.switchTo($scope.currentCubeIndex);
		};

		/* ----------------- init ----------------- */

		$http.get('api/groups').success(function (groups) {
			init(groups);
		});
	});
