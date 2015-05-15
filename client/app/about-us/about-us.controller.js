'use strict';

angular.module('theatreProjApp')
.controller('AboutUsCtrl', function ($scope, $window, $http) {
		/* independent variables */
		$scope.r = $(window).width() / 2;
		$scope.heightRatio = 2/3;
		$scope.rotation = 0;
		$scope.panelCount = 0;
		$scope.panels = [];
		$scope.currentPanelIndex = 0;

		/* The following functions return a style object for the various
		parts of the carousel. Because of their dependence on dynamic scope
		variables, they cannot be placed in the scss file. */
		$scope.carouselContainerStyle = function () {
			return {
				width: $scope.carouselContainerW + 'px',
				height: $scope.carouselContainerH + 'px',
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
			$scope.carouselContainerW = Math.min(circumference / $scope.panelCount, 300);
			$scope.carouselContainerH = $scope.carouselContainerW * $scope.heightRatio;
			$scope.panelMargin = $scope.carouselContainerW * 0.03;
			$scope.panelWidth = $scope.carouselContainerW - 2*$scope.panelMargin;
			$scope.panelHeight = $scope.carouselContainerH - 2*$scope.panelMargin;
			$scope.degDelta = 360 / $scope.panelCount;

			for (var i = 0; i < $scope.panelCount; i++) {
				var panel = {};
				panel.style = {
					width: $scope.panelWidth + 'px',
					height: $scope.panelHeight + 'px',
					left: $scope.panelMargin + 'px',
					right: $scope.panelMargin + 'px',
					top: $scope.panelMargin + 'px',
					'vertical-align': 'middle',
					background: 'hsla(' + i*$scope.degDelta + ', 100%, 50%, 1.0)',
					transform: 'rotateY(' + i*$scope.degDelta + 'deg) translateZ(' + $scope.r + 'px)'
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
