'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('DashboardController', ['$scope', '$state','$ionicPlatform','StorageUserModel','$User','$timeout','popUpService',
		function($scope, $state,$ionicPlatform,StorageUserModel,$User,$timeout,popUpService) {

			$scope.goToProducts =  function (){
				popUpService.workingOnPopUp();
			};

			$scope.isIphoneX =  function(){
				if(ionic.Platform.device().model != undefined){
					if(ionic.Platform.device().model.startsWith('iPhone10')){
						return true;
					}
				}
			};

			$ionicPlatform.ready(function() {

				StorageUserModel.getCurrentUser();
				$scope.register = {};
				$scope.user = StorageUserModel.getCurrentUser();


				$scope.goToPenaltyEnergyEfficiency = function(){
					$state.go('factor');
				};

				$scope.goToSettings = function(){
					$state.go('settings');
				};

				$scope.goToProjects =  function(){
					$state.go('project');
				};

				$scope.goToNews = function () {
					$state.go('news');
				};


				$ionicPlatform.registerBackButtonAction(function () {
					ionic.Platform.exitApp();
				}, 100);


			});
		}]);
}).call(this);
