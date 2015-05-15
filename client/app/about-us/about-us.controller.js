'use strict';

angular.module('theatreProjApp')
.controller('AboutUsCtrl', function ($scope, $window, $http) {
		/* independent variables */
		$scope.r = $(window).width() / 2;
		$scope.rotation = 0;
		$scope.panelCount = 0;
		$scope.panels = [];
		$scope.currentPanelIndex = 0;

		/* The following functions return a style object for the various
		parts of the carousel. Because of their dependence on dynamic scope
		variables, they cannot be placed in the scss file. */
		$scope.carouselContainerStyle = function () {
			return {
				width: $scope.carouselContainerLength + 'px',
				height: $scope.carouselContainerLength + 'px',
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

		/* Rotates the carousel to present the panel at panelIndex at the front. */
		$scope.switchToPanel = function (panelIndex) {
			if (panelIndex === $scope.currentPanelIndex) {
				return;
			}

			var indexDelta = Math.abs($scope.currentPanelIndex - panelIndex);
			var directionFactor = (panelIndex > $scope.currentPanelIndex)? 1 : -1;

			if (indexDelta > $scope.panelCount/2) {
				indexDelta = $scope.panelCount - indexDelta;
				directionFactor *= -1;
			}

			$scope.rotation -= indexDelta * $scope.degDelta * directionFactor;
			$scope.currentPanelIndex = panelIndex;
		};

		/* Initializes the carousel with a panel for each group in groups. */
		var init = function (groups) {
			$scope.panels = [];
			var circumference = 2 * Math.PI * $scope.r;
			$scope.panelCount = groups.length;
			$scope.carouselContainerLength = circumference / $scope.panelCount / 4;
			$scope.panelMargin = $scope.carouselContainerLength * 0.03;
			$scope.panelLength = $scope.carouselContainerLength - 2*$scope.panelMargin;
			$scope.degDelta = 360 / $scope.panelCount;

			for (var i = 0; i < $scope.panelCount; i++) {
				var panel = {};
				panel.cube = {
					transform: 'rotateY(' + i*$scope.degDelta + 'deg) translateZ(' + $scope.r + 'px)'
				};
				panel.front = {
					width: $scope.panelLength + 'px',
					height: $scope.panelLength + 'px',
					left: $scope.panelMargin + 'px',
					right: $scope.panelMargin + 'px',
					top: $scope.panelMargin + 'px',
					'vertical-align': 'middle',
				};
				panel.group = groups[i];
				$scope.panels.push(panel);
			};
			$scope.switchToPanel($scope.currentPanelIndex);
		};

		/* ----------------- init ----------------- */

		$http.get('api/groups').success(function (groups) {
			init(groups);
		});
	});
