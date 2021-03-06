'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('IntroductionController', ['$scope', '$state', '$ionicPlatform', '$cordovaStatusbar', '$ionicSlideBoxDelegate', '$timeout', '$Localization','$rootScope',
		function ($scope, $state, $ionicPlatform, $cordovaStatusbar, $ionicSlideBoxDelegate, $timeout, $Localization, $rootScope) {

			// $Localization.getTranslation();

			$ionicPlatform.ready(function () {

				$scope.isIphoneX = function () {
					if (ionic.Platform.device().model != undefined) {
						if (ionic.Platform.device().model.startsWith('iPhone10')) {
							return true;
						}
					}
				};

			});

			var containerId;
			var worldId;
			var notification_1;
			var notification_2;
			var hasChangeSlide3;


			$scope.shouldShowBackButton = false;

			$scope.init = function () {


				$timeout(function () {
					containerId = $('#introduction-content');
					worldId = $('#world-animate');
					notification_1 = $('#notification-id-1');
					notification_2 = $('#notification-id-2');
					worldId.addClass('world-container-active');
					hasChangeSlide3 = false;
				}, 1000);
			};

		
			$scope.RightButtonText = $rootScope.introduction.NEXT;
			$scope.LeftButtonText = $rootScope.introduction.BACK;
			$scope.SkipButtonText = $rootScope.introduction.SKIP;


			$ionicPlatform.registerBackButtonAction(function () {

				switch ($ionicSlideBoxDelegate.currentIndex()) {
				case 0:
					ionic.Platform.exitApp();
					break;
				case 1:
					$ionicSlideBoxDelegate.previous();
					break;
				case 2:
					$ionicSlideBoxDelegate.previous();
					break;
				}

			}, 100);


			$scope.slideHasChanged = function (_index) {

				switch (_index) {
				case 0:
					containerId.addClass('slider-one');
					containerId.removeClass('slider-two');
					$scope.shouldShowBackButton = false;
					break;
				case 1:
					containerId.addClass('slider-two');
					containerId.removeClass('slider-three');
					$scope.shouldShowBackButton = true;
					$scope.RightButtonText = $rootScope.introduction.NEXT;

					$timeout(function () {
						notification_1.addClass('left-active');
					}, 100);

					$timeout(function () {
						notification_2.addClass('right-active');
					}, 300);

					break;
				case 2:
					containerId.addClass('slider-three');
					containerId.removeClass('slider-two');
					$scope.shouldShowBackButton = true;
					$scope.RightButtonText = $rootScope.introduction.SKIP;

					if (!hasChangeSlide3) {
						var tl = new TimelineMax({});

						tl.set('.calendar-ctr', {
							scale: 0
						});

						tl.timeScale(1.2);

						tl.staggerTo('.bottom', .3, {
							rotationX: '0deg',
						}, .3)

							.staggerTo('.top', .3, {
								rotationX: '-90deg'
							}, .3, 0)

							.to('.calendar-ctr', 2.5, {
								scale: 0.75
							}, 0);

						// // restart animation
						// var refresh = document.querySelector(".refresh");
						// refresh.addEventListener("click", function(){
						//   tl.restart();
						// })

						// copy
						balapaCop('Google Calendar - Animated Icon', '#999');

						hasChangeSlide3 = true;
					}




					break;
				default:

				}
			};

			$timeout(function () {
				var land = document.querySelectorAll('.land');
				var cloud = document.querySelectorAll('.cloud');

				for (var i = 0; i < land.length; i++) {
					land[i].style.transform = 'translate(' + Math.round(Math.random() * 150) + 'px, ' + Math.round(Math.random() * 150) + 'px)';
					land[i].style.width = Math.round(Math.random() * 50) + 50 + 'px';
				}

				for (var i = 0; i < cloud.length; i++) {
					cloud[i].style.transform = 'translate(' + Math.round(Math.random() * 150) + 'px, ' + Math.round(Math.random() * 150) + 'px)';
					cloud[i].style.width = Math.round(Math.random() * 25) + 25 + 'px';
				}

				requestAnimationFrame(animate);

				function animate() {
					for (var i = 0; i < land.length; i++) {
						move(land[i]);
						move(cloud[i]);
					}

					requestAnimationFrame(animate);
				}

				function move(el) {
					var s = el.style.transform.split('(')[1].split(',');
					var x = s[0].split('px')[0];
					var y = s[1];
					var w = el.style.width.split('px')[0];

					var nx = parseInt(x) - 1;

					if (nx + parseInt(w) < -20) {
						nx = 170;
					}
					el.style.transform = 'translate(' + nx + 'px, ' + y;
				}
			}, 10);

			$scope.goAhead = function () {
				var current_index = $ionicSlideBoxDelegate.currentIndex();
				switch (current_index) {
				case 0:
				case 1:
					$ionicSlideBoxDelegate.next();
					break;
				case 2:
					$state.go('middleware');
					break;
				default:

				}

			};

			$scope.goBack = function () {
				$ionicSlideBoxDelegate.previous();
			};

			$scope.skip = function () {
				$state.go('middleware');
			};



		}
	]);
}).call(this);