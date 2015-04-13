'use strict';

angular.module('theatreProjApp')
  .controller('AboutUsCtrl', function ($scope) {
    // independent params
  	$scope.carouselContainerW = 400
    $scope.heightRatio = 2/3;
  	$scope.rotation = 0;
    $scope.panelCount = 20;
    $scope.panelMargin = 10;

    // derived params
    $scope.refresh = function () {
      $scope.carouselContainerH = $scope.carouselContainerW * $scope.heightRatio;
      $scope.panelWidth = $scope.carouselContainerW - 2*$scope.panelMargin;
      $scope.panelHeight = $scope.carouselContainerH - 2*$scope.panelMargin;
    	$scope.degDelta = 360 / $scope.panelCount;
    	$scope.r = Math.round( $scope.carouselContainerW/2 / Math.tan(Math.PI / $scope.panelCount));
    };

    $scope.refresh();

    $scope.getPanelRepeat = function () {
      return new Array($scope.panelCount);
    };

  	$scope.carouselContainerStyle = function (index) {
  		return {
  			width: $scope.carouselContainerW + "px",
  			height: $scope.carouselContainerH + "px",
  		};
  	};

  	$scope.carouselStyle = function () {
  		return {
  			transform: "translateZ(-" + $scope.r + "px) rotateY(" + $scope.rotation + "deg)",
  		};
  	};

  	$scope.panelStyle = function (index) {
  		return {
  			width: $scope.panelWidth + "px",
  			height: $scope.panelHeight + "px",
  			left: $scope.panelMargin + "px",
  			right: $scope.panelMargin + "px",
  			top: $scope.panelMargin + "px",
        'font-size': $scope.carouselContainerH * 0.5,
        'vertical-align': "middle",
  			background: "hsla(" + index*$scope.degDelta + ", 100%, 50%, 0.8)",
  			transform: "rotateY(" + index*$scope.degDelta + "deg) translateZ(" + $scope.r + "px)"
  		};
  	};

    $scope.setPanelCount = function (count) {
      $scope.panelCount = count;
      $scope.refresh();
    };

  	$scope.setRotation = function (rotation) {
  		$scope.rotation = rotation;
  	};
  });
