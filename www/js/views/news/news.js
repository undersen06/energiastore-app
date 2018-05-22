'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('NewsController', ['$scope', '$state', '$ionicPlatform', 'StorageUserModel', '$User', '$timeout', 'popUpService', '$News', '$log','$ionicSlideBoxDelegate',
		function ($scope, $state, $ionicPlatform, StorageUserModel, $User, $timeout, popUpService, $News, $log, $ionicSlideBoxDelegate) {
        

			$scope.goToProducts = function () {
				popUpService.workingOnPopUp();
			};

			$scope.isIphoneX = function () {
				if (ionic.Platform.device().model != undefined) {
					if (ionic.Platform.device().model.startsWith('iPhone10')) {
						return true;
					}
				}
			};

			$ionicPlatform.ready(function () {

				$scope.init = function () {
                    
					$News.getNews().then(function (_response) {
						$scope.news = _response.data;
						$ionicSlideBoxDelegate.update();
						
					}, function (_error) {
						//TODO show error
						$log.error(_error);
                        
					});
				};


				$scope.init();

				$scope.goBack =  function(){
					$state.go('dashboard');
				};	
			});
		}
	]);
}).call(this);