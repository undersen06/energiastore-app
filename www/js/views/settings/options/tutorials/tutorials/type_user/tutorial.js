'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('TutorialTypeUserController', ['$scope', '$state', '$ionicPlatform', '$resource', '$cordovaStatusbar', '$ionicSlideBoxDelegate', '$timeout', '$ionicPopup','$rootScope',
		function ($scope, $state, $ionicPlatform, $resource, $cordovaStatusbar, $ionicSlideBoxDelegate, $timeout, $ionicPopup, $rootScope) {

	


			$ionicPlatform.ready(function() {

				$scope.isIphoneX =  function(){
					if(ionic.Platform.device().model != undefined){
						if(ionic.Platform.device().model.startsWith('iPhone10')){
							return true;
						}
					}
				};


				$scope.RightButtonText = $rootScope.introduction.NEXT;
				$scope.LeftButtonText = $rootScope.introduction.BACK;
				$scope.SkipButtonText = $rootScope.introduction.SKIP;


				const containerId = $('#type_user-content');
				// const worldId = $('#world-animate');
				// const notification_1 = $('#notification-id-1');
				// const notification_2 = $('#notification-id-2');
				// var  hasChangeSlide3 = false;


				$scope.shouldShowBackButton=false;



				$scope.init = function(){
					if($state.params.flag != 'config'){
						$ionicPopup.show({
							animation: 'fade-in',
							title: '<img src="assets/img/common/stars.png">',
							subTitle: `<span class="popup-title">${$rootScope.tutorials.TUTORIAL_WELCOME_TITLE}</span>`,
							template: `<p class="popup-subtitle">${$rootScope.tutorials.TUTORIAL_WELCOME_TEXT}</p>`,
							scope: $scope,
							buttons: [
								{
									text: `${$rootScope.project.QUOTATION_POPUP_CANCEL_BUTTON}`,
									type: 'button-cancel'
								},
								{
									text: `${$rootScope.settings.ABOUT_US_BUTTON_TEXT}`,
									type: 'button-affirmative',
									onTap: function(e) {

									}
								}
							]
						});
					}
				};


				$scope.finish = function(){


					if($state.params.flag == 'config'){
						$state.go('tutorial');
					}else{

						$ionicPopup.show({
							animation: 'fade-in',
							title: '<img src="assets/img/common/flying_email.png">',
							subTitle: `<span class="popup-title">${$rootScope.tutorials.TUTORIAL_TYPE_USER_TITLE}</span>`,
							template: `<p class="popup-subtitle">${$rootScope.tutorials.TUTORIAL_TYPE_USER_TEXT}</p>`,
							scope: $scope,
							buttons: [
								{
									text: `${$rootScope.tutorials.ABOUT_US_BUTTON_TEXT}`,
									type: 'button-affirmative',
									onTap: function(e) {

										if($state.params.flag == 'config'){
											$state.go('tutorials');
										}else{
											$state.go('middleware');
										}
									}
								}
							]
						});
					}
				};




				$scope.slideHasChanged = function(_index){

					switch (_index) {
					case 0:
						containerId.addClass('slider-one');
						containerId.removeClass('slider-two');
						$scope.shouldShowBackButton=false;
						break;
					case 1:
						containerId.addClass('slider-two');
						containerId.removeClass('slider-three');
						$scope.shouldShowBackButton=true;
						// $scope.RightButtonText = $scope.translations.NEXT;
						break;
					case 2:
						containerId.addClass('slider-three');
						containerId.removeClass('slider-two');
						// $scope.RightButtonText = $scope.translations.SKIP;



						break;
					default:

					}
				};


				$scope.goBack = function(){
					$ionicSlideBoxDelegate.previous();
				};

				$scope.goAhead = function(){
					if(($ionicSlideBoxDelegate.currentIndex()+1) === $ionicSlideBoxDelegate.slidesCount()){
						$scope.finish();
					}else{
						$ionicSlideBoxDelegate.next();
					}
				};


			});
		}]);
}).call(this);
