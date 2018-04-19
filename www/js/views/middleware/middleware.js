'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('MiddlewareController', ['$scope', '$state', '$ionicPlatform', '$timeout', 'StorageUserModel', 'popUpService',
		function ($scope, $state, $ionicPlatform, $timeout, StorageUserModel, popUpService) {
			$ionicPlatform.ready(function () {

				$scope.isIphoneX = function () {
					if (ionic.Platform.device().model != undefined) {
						if (ionic.Platform.device().model.startsWith('iPhone10')) {
							return true;
						}
					}
				};
			});



			if (StorageUserModel.getCurrentUser()) {
				if (StorageUserModel.getCurrentUser().type_user === 'explorer') {
					$state.go('dashboard');
				} else if (StorageUserModel.getCurrentUser().authentication_token !== undefined) {
					$state.go('dashboard');
				}
			}

			$ionicPlatform.ready(function () {

				$scope.handleGoTo = function (_index) {

					switch (_index) {
					case 1:
						StorageUserModel.setCurrentUser({
							type_user: 'user'
						});
						$state.go('login');
						break;

					case 2:
						popUpService.workingOnPopUp();
						break;

					case 3:
						StorageUserModel.setCurrentUser({
							type_user: 'explorer'
						});
						$state.go('dashboard');
						break;
					default:
						break;
					}
				};


				$scope.getHelp = function () {
					$state.go('tutorialTypeUser');
				};

			});
		}]);
}).call(this);
