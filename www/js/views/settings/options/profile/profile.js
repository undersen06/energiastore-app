'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('ProfileController', ['$scope', '$state', '$ionicPlatform', '$rootScope', '$Session', 'StorageUserModel', '$User', '$resource', 'translationService', 'popUpService', '$log',
		function ($scope, $state, $ionicPlatform, $rootScope, $Session, StorageUserModel, $User, $resource, translationService, popUpService, $log) {

			$scope.design = {};
			switch (StorageUserModel.getCurrentUser().type_user) {
			case 'user':

				$scope.design.header = 'user-color';
				$scope.design.footer = 'user-color';
				$scope.design.button = 'user-color-button';
				break;

			case 'partner':
				$scope.design.header = 'partner-color';
				$scope.design.footer = 'partner-color';
				$scope.design.button = 'partner-color-button';
				break;

			case 'explorer':
				$scope.design.header = 'explorer-color';
				$scope.design.footer = 'explorer-color';
				$scope.design.button = 'explorer-color-button';
				break;
			default:
				$scope.design.header = 'user-color';
				$scope.design.footer = 'user-color';
				$scope.design.button = 'user-color-button';
				break;
			}

			$ionicPlatform.ready(function () {


				$User.getAvatars().then(function(_response){
					$log.info(_response);

				},function(_error){
					$log.info(_error);
				});

				const languageFilePath = translationService.getTranslation();
				$resource(languageFilePath).get(function (data) {
					$scope.translations = data;
				});


				$scope.placeholder = {};
				$scope.user = {};

				$scope.init = function () {


					var user = StorageUserModel.getCurrentUser();


					$scope.placeholder.name = 'Nombre';
					$scope.placeholder.last_name = 'Apellido';
					$scope.placeholder.phone = 'Teléfono';
					$scope.placeholder.address = 'Dirección';

					if (user.name !== undefined) { $scope.placeholder.name = user.name; }
					if (user.last_name !== undefined) { $scope.placeholder.name = user.last_name; }
					if (user.phone !== undefined) { $scope.placeholder.name = user.phone; }
					if (user.address !== undefined) { $scope.placeholder.name = user.address; }

				};


				$scope.$on('$ionicView.beforeEnter', function () {
					var user = Object.assign({}, StorageUserModel.getCurrentUser());

					if (user.name !== undefined)
						$scope.placeholder.name = user.name;

					if (user.last_name !== undefined)
						$scope.placeholder.last_name = user.last_name;

					if (user.phone !== undefined)
						$scope.placeholder.phone = user.phone;

					if (user.address !== undefined)
						$scope.placeholder.address = user.address;

				});


				$scope.changeLanguage = function () {

				};

				$scope.backButton = function () {
					$state.go('settings');
				};

				$ionicPlatform.registerBackButtonAction(function () {
					$scope.backButton();
				}, 100);

				$scope.updateInfo = function () {

					if ($scope.user.name === undefined || $scope.user.name === '') {
						this.Materialize.toast('Complete nombre', 4000);
						return;
					}

					if ($scope.user.last_name === undefined || $scope.user.last_name === '') {
						this.Materialize.toast('Complete apellido', 4000);
						return;
					}
					if ($scope.user.phone === undefined || $scope.user.phone === '') {
						this.Materialize.toast('Complete teléfono', 4000);
						return;
					}
					if ($scope.user.address === undefined || $scope.user.address === '') {
						this.Materialize.toast('Complete dirección', 4000);
						return;
					}



					$User.updateUser(StorageUserModel.getCurrentUser(), $scope.user).then(function (_response) {
						StorageUserModel.setCurrentUser(_response.data);
						popUpService.showPopUpProfileCreate($scope.translations).then(function () {
							$state.go('dashboard');
						});
						$log.info(_response);
					}, function (_error) {
						popUpService.showPopUpProfileFail($scope.translations).then(function () {
							$log.error(_error);
							$state.go('settings');
						});


					});



				};

				$scope.deleteData = function () {
					StorageUserModel.destroyCurrentUser();
					$state.go('login');
				};


				$scope.goToProjects = function () {
					$state.go('project');
				};
				$scope.goToProfile = function () {
					$state.go('settings');
				};
				$scope.goToQuotes = function () {
					$state.go('quotation');
				};

				$scope.goToDashboard = function () {
					$state.go('dashboard');
				};



			});
		}]);
}).call(this);
