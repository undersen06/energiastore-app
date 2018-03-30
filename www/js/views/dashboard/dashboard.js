'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('DashboardController', ['$scope', '$state','$ionicPlatform','StorageUserModel','translationService','$resource','$cordovaStatusbar','User','$timeout','popUpService',
		function($scope, $state,$ionicPlatform,StorageUserModel,translationService,$resource,$cordovaStatusbar,User,$timeout,popUpService) {

			$scope.design = {};
			switch (StorageUserModel.getCurrentUser().type_user) {
			case 'user':

				$scope.design.header = 'user-color';
				$scope.design.footer = 'user-color';
				break;

			case 'partner':
				$scope.design.header = 'partner-color';
				$scope.design.footer = 'partner-color';
				break;

			case 'explorer':
				$scope.design.header = 'explorer-color';
				$scope.design.footer = 'explorer-color';
				break;
			default: 
				$scope.design.header = 'user-color';
				$scope.design.footer = 'user-color';
				break;
			}
			const languageFilePath = translationService.getTranslation();
			$resource(languageFilePath).get(function (data) {
				$scope.translations = data;
			});

			$scope.goToProducts =  function (){
				popUpService.workingOnPopUp($scope.translations).then(function(){

				});
			};

    $scope.isIphoneX =  function(){
      if(ionic.Platform.device().model != undefined){
        if(ionic.Platform.device().model.startsWith('iPhone10')){
          return true;
        }
      }
    }

    $ionicPlatform.ready(function() {

				StorageUserModel.getCurrentUser();
				$scope.register = {};
				$scope.user = StorageUserModel.getCurrentUser();


				$scope.goToPenaltyEnergyEffiency = function(){
					$state.go('factor');
				};

				$scope.goToSettings = function(){
					$state.go('settings');
				};

				$scope.goToProjects =  function(){
					$state.go('project');
				};

				$ionicPlatform.registerBackButtonAction(function () {
					this.ionic.Platform.exitApp();
				}, 100);


			});
		}]);
}).call(this);
