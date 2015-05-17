'use strict';

angular.module('theatreProjApp')
.controller('AboutUsCtrl', function ($scope, $window, $http) {
	/* independent variables */
	$scope.r = $(window).width() / 2; // radius of the carousel
	$scope.rotation = 0; // the current rotation of the carousel
	$scope.cubes = []; // the cube data (holding the group, etc)
	$scope.currentCubeIndex = 0; // the index of the cube at the front
	var zShift = $scope.r * 2; // amt to push the carousel back into the screen
	var cubeInactiveScaleFactor = 0.4; // the amount to scale inactive cubes by.
	var floorW = $scope.r*8; // the length of the floor from back wall to front edge.
	var floorH = $scope.r*4; // the length of the floor from back wall to front edge.
	var curtainW = $scope.r*2; // the width of the left and right curtains.
	var curtainH = $scope.r; // the height of the left and right curtains.
	var curtainOpenDist = $scope.r*0.8; // the amount to move each curtain by for opening.

	/* Initially, only a limited amount of boxes are loaded. Clicking the 'load boxes' button
	loads them all, setting this value to true. */
	$scope.boxesLoaded = false;

	/* Becomes true once the initial limited set of boxes are loaded. */
	$scope.initialized = false;

	/* Initializes the carousel with a cube for each group in groups. This method is called for
	the first time at the bottom of this controller declaration. */
	var init = function (groups) {
		$scope.rotation = 0;
		$scope.currentCubeIndex = 0;
		$scope.cubes = [];
		var count = groups.length;
		var circumference = 2 * Math.PI * $scope.r;
		$scope.cubeLength = Math.min(circumference / count * 0.6, 225);
		$scope.degDelta = 360 / count;

		for (var i = 0; i < groups.length; i++) {
			var cube = {};
			cube.group = groups[i];
			$scope.cubes.push(cube);
		};
		$scope.switchTo($scope.currentCubeIndex);
		$scope.initialized = true;
	};

	/* -----------------------------------------------------------------------------------------------
	The following style functions return a style object for the various
	parts of the carousel scene. Because of their dependence on dynamic scope
	variables, they cannot be placed in the scss file.
	----------------------------------------------------------------------------------------------- */

	/* The container for everything. */
	$scope.carouselContainerStyle = function () {
		return {
			// width: $scope.cubeLength + 'px'
		};
	};

	/* The carousel-translate div pushes the scene back into the screen so we can see it. */
	$scope.carouselTranslateStyle = function () {
		var ret = {
			transform: ''
		}
		ret.transform += 'translateY(' + ($scope.r*1) + 'px)'; // move it down a bit
		ret.transform += ' translateZ(-' + zShift + 'px)'; // push it back
		ret.transform += ' rotateX(0deg)'; // rotate it forwards a little
		return ret;
	};

	/* The style object for the floor. */
	$scope.floorStyle = function () {
		var w = floorW;
		var h = floorH;
		var ret = {
			width: w + 'px',
			height: h + 'px',
			'transform-origin': 'top center',
			transform: ''
		};
		ret.transform += ' translateX(-' + (w/2) + 'px)'; // centre it horizontally
		ret.transform += ' translateZ(-' + (h/2) + 'px)'; // move it back into the screen
		ret.transform += ' rotateX(90deg)'; // rotate it so it's flat
		return ret;
	};

	/* The style object for the front wall at the front end of the floor. */
	$scope.floorWallStyle = function () {
		var w = floorW;
		var h = $scope.r;
		var ret = {
			width: w + 'px',
			height: h + 'px',
			'transform-origin': 'top center',
			transform: ''
		};
		ret.transform += ' translateX(-' + (w/2) + 'px)'; // centre it horizontally
		ret.transform += ' translateZ(' + (floorH/2 - 1) + 'px)'; // move it out to the front edge of the floor (- 1px)
		return ret;
	};

	/* The style object for the back wall. */
	$scope.backWallStyle = function () {
		var w = floorW;
		var h = $scope.r;
		var ret = {
			width: w + 'px',
			height: h + 'px',
			'transform-origin': 'bottom left',
			transform: ''
		};
		ret.transform += 'translateY(-' + h + 'px)'; // move it to floor level
		ret.transform += ' translateX(-' + (w/2) + 'px)'; // centre it horizontally
		ret.transform += ' translateZ(-' + (floorH/2 - 10) + 'px)'; // move it back into the screen (but back a bit, don't want artifacts)
		return ret;
	};

	/* Returns the appropriate style object for the requested curtain (left or right). */
	var curtainStyle = function (isLeft) {
		var ret = {
			width: curtainW + 'px',
			height: curtainH + 'px',
			'transform-origin': 'bottom',
			transform: ''
		};
		ret.transform += 'translateY(-' + curtainH + 'px)'; // move it to floor level
		var factor = isLeft? -1 : 1;
		ret.transform += ' translateX(-' + (curtainW/2 - factor*curtainW/2) + 'px)'; // move it into position horizontally
		ret.transform += ' translateX(' + (factor*curtainOpenDist) + 'px)'; // open the curtain
		ret.transform += ' translateZ(' + (floorH/2*0.84) + 'px)'; // move it forwards
		return ret;
	};

	/* We maintain these in a persistent object so that we can refer to them during a curtain
	drag. */
	$scope.curtainStyles = {
		left: curtainStyle(true),
		right: curtainStyle(false)
	};

	/* The style object for the hanging curtains. */
	$scope.hangCurtainStyle = function() {
		var w = $scope.r*3;
		var h = $scope.r*0.23;
		var ret = {
			width: w + 'px',
			height: h + 'px',
			'transform-origin': 'bottom',
			transform: ''
		};
		var curtainH = $scope.r;
		ret.transform += 'translateY(-' + (curtainH*1.04) + 'px)'; // move it up
		ret.transform += ' translateX(-' + (w/2) + 'px)'; // move it into position horizontally
		ret.transform += ' translateZ(' + (floorH/2*0.85) + 'px)'; // move it forwards
		return ret;
	};

	/* The style object for the 'load more boxes' button. */
	$scope.loadButtonStyle = function() {
		var w = $scope.r*0.2;
		var h = $scope.r*0.1;
		var ret = {
			width: w + 'px',
			height: h + 'px',
			'transform-origin': 'bottom',
			transform: ''
		};
		ret.transform += ' translateX(-' + (w/2) + 'px)'; // centre it horizontally
		ret.transform += ' translateZ(' + (floorH/2 + 1) + 'px)'; // move it out to the front edge of the floor
		return ret;
	};

	/* The style object for the 'back' button. */
	$scope.backButtonStyle = function() {
		var w = $scope.r*0.2;
		var h = $scope.r*0.1;
		var ret = {
			width: w + 'px',
			height: h + 'px',
			'transform-origin': 'bottom',
			transform: ''
		};
		ret.transform += ' translateX(-' + (curtainOpenDist + w) + 'px)'; // move it to the left
		ret.transform += ' translateZ(' + (floorH/2 + 1) + 'px)'; // move it out to the front edge of the floor
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
			transform: ''
		}
		ret.transform += ' rotateY(' + cubeIndex*$scope.degDelta + 'deg)'; // rotate the cube the appropriate amt to fit in the ring
		ret.transform += ' translateZ(' + $scope.r + 'px)'; // push the cube out from the centre
		return ret;
	};

	/* Returns the appropriate style for a cube panel.
	@param cube the cube object.
	@param panel a string describing which panel is being styled.
	@param cubeIndex the cubeIndex, used to determine if the cube is active or not. */
	$scope.panelStyle = function (cube, panel, cubeIndex) {
		var ret = {
			width: $scope.cubeLength + 'px',
			height: $scope.cubeLength + 'px',
			transform: ''
		}

		var len = $scope.cubeLength/2; // the cube half-length. defined here for conciseness, as it's used a lot.
		var active = $scope.isActive(cubeIndex);
		if (!active) {
			len *= cubeInactiveScaleFactor;
		}

		ret.transform += ' translateY(-' + ($scope.cubeLength + 50) + 'px)'; // move it up to floor level (plus a few px to avoid artifacts)
		ret.transform += ' translateX(-' + ($scope.cubeLength/2) + 'px)';

		switch (panel) {
			case 'front':
			ret['transform-origin'] = 'bottom';
			ret.transform += ' translateZ(' + len + 'px)'; // move it to the front of the cube
			if (active) {
				ret.transform += ' rotateX(-85deg)'; // unfold to lay flat
			}
			break;
			
			case 'back':
			ret['transform-origin'] = 'bottom';
			ret.transform += ' translateZ(-' + len + 'px)'; // move it to the back of the cube
			break;
			
			case 'top':
			ret['transform-origin'] = 'top';
			ret.transform += ' translateZ(-' + len + 'px)'; // move it to align with the back of the cube
			if (active) {
				ret.transform += ' rotateX(180deg)'; // unfold it to lay open
			} else {
				ret.transform += ' rotateX(90deg)'; // rotate it to lay flat
				ret.transform += ' translateZ(-' + ($scope.cubeLength - len * 2) + 'px)'; // shift it to align with the post-transformed cube
			}
			break;

			case 'bottom':
			ret['transform-origin'] = 'bottom';
			ret.transform += ' rotateX(-90deg)'; // rotate it to lay flat
			ret.transform += ' translateY(' + len + 'px)'; // move it to the bottom of the cube
			break;

			case 'left':
			ret['transform-origin'] = 'bottom right';
			if (active) {
				ret.transform += ' translateX(-' + (len * 2) + 'px)'; // move it to align with the left of the cube
				ret.transform += ' translateZ(-' + len + 'px)'; // move it to align with the back left edge of the cube
				ret.transform += ' rotateY(50deg)'; // unfold it a little
			} else {
				ret.transform += ' translateX(-' + ($scope.cubeLength/2 + len) + 'px)'; // move it to align with the left of the cube
				ret.transform += ' translateZ(-' + len + 'px)'; // move it to align with the back left edge of the post-transformed cube
				ret.transform += ' rotateY(90deg)'; // rotate it to lay flush
			}
			break;

			case 'right':
			ret['transform-origin'] = 'bottom left';
			if (active) {
				ret.transform += ' translateX(' + (len * 2) + 'px)'; // move it to align with the right of the cube
				ret.transform += ' translateZ(-' + len + 'px)'; // move it to align with the back right edge of the cube
				ret.transform += ' rotateY(-50deg)'; // unfold it a little
			} else {
				ret.transform += ' translateX(' + ($scope.cubeLength/2 + len) + 'px)'; // move it to align with the right of the cube
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

	/* Returns the style used for the facebook link button. */
	$scope.fbStyle = function (cubeIndex) {
		var margin = $scope.cubeLength*0.07;
		var l = $scope.cubeLength - 2*margin;
		var active = $scope.isActive(cubeIndex);
		var ret = {
			width: l + 'px',
			height: l + 'px',
			transform: '',
			opacity: active? 1 : 0
		}
		ret.transform += ' translateX(' + margin + 'px)';
		ret.transform += ' translateY(' + margin + 'px)';
		return ret;
	};

	/* Returns the style used for the contact button. */
	$scope.contactStyle = function (cubeIndex) {
		var margin = $scope.cubeLength*0.07;
		var l = $scope.cubeLength - 2*margin;
		var active = $scope.isActive(cubeIndex);
		var ret = {
			width: l + 'px',
			height: l + 'px',
			transform: '',
			opacity: active? 1 : 0
		}
		ret.transform += ' translateX(' + margin + 'px)';
		ret.transform += ' translateY(' + margin + 'px)';
		return ret;
	};

	/* Returns the style for the info presented in the active cube.
	@param cube the cube object.
	@param cubeIndex the cubeIndex, used to determine if the cube is active or not. */
	$scope.infoStyle = function (cube, cubeIndex) {
		var w = $scope.cubeLength*4;
		var h = $scope.cubeLength*0.7;
		var ret = {
			width: w + 'px',
			height: h + 'px',
			'transform-origin': 'bottom',
			transform: ''
		}

		var len = $scope.cubeLength/2; // the cube half-length. defined here for conciseness, as it's used a lot.
		var active = $scope.isActive(cubeIndex);
		if (!active) {
			len *= cubeInactiveScaleFactor;
		}

		ret.transform += ' translateX(-' + (w/2) + 'px)'; // centre it horizontally
		ret.transform += ' translateY(-' + (h) + 'px)'; // move it to floor level
		if (active) {
			ret.opacity = '1';
			ret.transform += ' translateZ(' + (len*5) + 'px)'; // move it forward a lot
			ret.transform += ' rotateX(1deg)'; // rotate it back a bit
		} else {
			ret.opacity = '0';
		}

		if (!active) {
			// apply post transform
			ret.transform += ' scale(0.05)';
		}

		return ret;
	}

	/* -----------------------------------------------------------------------------------------------
	The following functions perform some kind of functional task, and are used from the markup.
	----------------------------------------------------------------------------------------------- */

	/* Opens an external url.
	@param url a string starting with 'www.' */
	$scope.link = function (url) {
		$window.open('http://' + url);
	};

	/* Opens mail client to send an email to addr.
	@param addr an email address string, eg. steven@gmail.com */
	$scope.mailto = function (addr) {
		$window.open('mailto:'+addr);
	};

	/* Holds info pertaining to a curtain drag. */
	$scope.curtainDragObj = {
		left: {
			origTransform: '',
			dragTransform: ''
		},
		right: {
			origTransform: '',
			dragTransform: ''
		},
		dragging: false,
		didClose: false,
		class: ''
	}
	/* Called when a curtain is touched. */
	$scope.curtainDragStart = function (isLeft, $event) {
		$scope.curtainDragObj.class = 'drag-start';
		$scope.curtainDragObj.left.origTransform = $scope.curtainStyles.left.transform;
		$scope.curtainDragObj.right.origTransform = $scope.curtainStyles.right.transform;
	};

	/* Called when a curtain is dragged. */
	$scope.curtainDragMove = function (isLeft, $event) {
		$scope.curtainDragObj.class = 'drag-move';
		$scope.curtainDragObj.dragging = true;
		var style = isLeft? $scope.curtainStyles.left : $scope.curtainStyles.right;
		var leftFactor = isLeft? 1 : -1;
		var rightFactor = isLeft? -1 : 1;
		var dx = $event.gesture.deltaX;
		if (Math.abs(dx) > curtainOpenDist) {
			dx = isLeft? curtainOpenDist : -curtainOpenDist;
			$scope.curtainDragObj.didClose = true;
		}
		$scope.curtainDragObj.left.dragTransform = ' translateX(' + (dx * leftFactor) + 'px)';
		$scope.curtainDragObj.right.dragTransform = ' translateX(' + (dx * rightFactor) + 'px)';
		$scope.curtainStyles.left.transform = $scope.curtainDragObj.left.origTransform + $scope.curtainDragObj.left.dragTransform;
		$scope.curtainStyles.right.transform = $scope.curtainDragObj.right.origTransform + $scope.curtainDragObj.right.dragTransform;
	};

	/* Called when a curtain is released. */
	$scope.curtainDragEnd = function (isLeft, $event) {
		$scope.curtainDragObj.class = 'drag-end';
		$scope.curtainDragObj.dragging = false;
		$scope.curtainStyles.left.transform = $scope.curtainDragObj.left.origTransform;
		$scope.curtainStyles.right.transform = $scope.curtainDragObj.right.origTransform;
		if ($scope.curtainDragObj.didClose) {
			var sound = new Audio('assets/applause.mp3');
			sound.play();
			$scope.curtainDragObj.didClose = false;
		}
	};

	/* Loads all the boxes into the carousel. */
	$scope.loadBoxes = function () {
		$http.get('api/aboutusgroups').success(function (groups) {
			$scope.boxesLoaded = true;
			init(groups);
		});
	};

	/* Returns user to the previous page in the history. */
	$scope.back = function () {
		$window.history.back();
	}

	/* Rotates the carousel to present the cube at currentCubeIndex at the front.
	@param cubeIndex the cubeIndex of the cube which should be presented. */
	$scope.switchTo = function (cubeIndex) {
		if (cubeIndex === $scope.currentCubeIndex) {
			return;
		}

		var indexDelta = Math.abs($scope.currentCubeIndex - cubeIndex);
		var directionFactor = (cubeIndex > $scope.currentCubeIndex)? 1 : -1;

		var count = $scope.cubes.length;
		if (indexDelta > count/2) {
			indexDelta = count - indexDelta;
			directionFactor *= -1;
		}

		$scope.rotation -= indexDelta * $scope.degDelta * directionFactor;
		$scope.currentCubeIndex = cubeIndex;
	};

	$scope.isActive = function (cubeIndex) {
		return (cubeIndex == $scope.currentCubeIndex) && !$scope.curtainDragObj.dragging;
	}

	/* Returns active if the cube at cubeIndex is the one at the front, inactive
	otherwise.
	@param cubeIndex the cubeIndex of the cube whose activity is being requested. */
	$scope.getActivityClass = function (cubeIndex) {
		return $scope.isActive(cubeIndex)? 'active' : 'inactive';
	};

	/* -----------------------------------------------------------------------------------------------
													Init
	----------------------------------------------------------------------------------------------- */

	$http.get('api/aboutusgroups/limit/5').success(function (groups) {
		init(groups);
	});
});
