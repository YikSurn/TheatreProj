'use strict';

angular.module('theatreProjApp')
.controller('AboutUsCtrl', function ($scope) {
		// independent params
		$scope.carouselContainerW = 400;
		$scope.heightRatio = 2/3;
		$scope.rotation = 0;
		$scope.panelCount = 20;
		$scope.panelMargin = 10;
		$scope.panels = [];
		$scope.currentPanelIndex = 0;

		// derived params
		$scope.carouselContainerH = $scope.carouselContainerW * $scope.heightRatio;
		$scope.panelWidth = $scope.carouselContainerW - 2*$scope.panelMargin;
		$scope.panelHeight = $scope.carouselContainerH - 2*$scope.panelMargin;
		$scope.degDelta = 360 / $scope.panelCount;
		$scope.r = Math.round( $scope.carouselContainerW/2 / Math.tan(Math.PI / $scope.panelCount));

		$scope.carouselContainerStyle = function () {
			return {
				width: $scope.carouselContainerW + 'px',
				height: $scope.carouselContainerH + 'px',
			};
		};

		$scope.carouselStyle = function () {
			return {
				transform: 'translateZ(-' + $scope.r + 'px) rotateY(' + $scope.rotation + 'deg)',
			};
		};

		$scope.switchToPanel = function (panelIndex) {
			var indexDelta = Math.abs($scope.currentPanelIndex - panelIndex);
			var directionFactor = (panelIndex > $scope.currentPanelIndex)? 1 : -1;
			$scope.rotation -= indexDelta * $scope.degDelta * directionFactor;
			$scope.currentPanelIndex = panelIndex;
			console.log(panelIndex, $scope.currentPanelIndex);
		};

		/* ----------------- init code ----------------- */

		for (var i = 0; i < $scope.panelCount; i++) {
			var panel = {};
			panel.style = {
				width: $scope.panelWidth + 'px',
				height: $scope.panelHeight + 'px',
				left: $scope.panelMargin + 'px',
				right: $scope.panelMargin + 'px',
				top: $scope.panelMargin + 'px',
				'font-size': $scope.carouselContainerH * 0.5,
				'vertical-align': 'middle',
				background: 'hsla(' + i*$scope.degDelta + ', 100%, 50%, 0.8)',
				transform: 'rotateY(' + i*$scope.degDelta + 'deg) translateZ(' + $scope.r + 'px)'
			};
			$scope.panels.push(panel);
		};

		$scope.switchToPanel($scope.currentPanelIndex);
	});
