'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('TutorialPenaltyController', ['$scope', '$state', '$ionicPlatform', '$resource', '$cordovaStatusbar', '$ionicSlideBoxDelegate', '$timeout', '$ionicPopup', 'StorageLanguageModel','$rootScope',
		function ($scope, $state, $ionicPlatform, $resource, $cordovaStatusbar, $ionicSlideBoxDelegate, $timeout, $ionicPopup, StorageLanguageModel, $rootScope) {
			$ionicPlatform.ready(function() {

				const containerId = $('#content-id');
				$scope.shouldShowBackButton=false;
				$scope.translations = {};

				
				$scope.finish = function(){
					$state.go('tutorials');
				};
				

				$scope.RightButtonText = $rootScope.introduction.NEXT;
				$scope.LeftButtonText = $rootScope.introduction.BACK;
				$scope.SkipButtonText = $rootScope.introduction.SKIP;


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

						break;
					case 2:
						containerId.addClass('slider-three');
						containerId.removeClass('slider-two');
						// $scope.RightButtonText = 'Finalizar';


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
