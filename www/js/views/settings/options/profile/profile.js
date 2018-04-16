'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('ProfileController', ['$scope', '$state', '$ionicPlatform', '$rootScope', '$Session', 'StorageUserModel', '$User', '$resource', 'translationService', 'popUpService', '$log', 'Utils', '$timeout', '$ionicSlideBoxDelegate','StorageCountryModel',
		function ($scope, $state, $ionicPlatform, $rootScope, $Session, StorageUserModel, $User, $resource, translationService, popUpService, $log, Utils, $timeout, $ionicSlideBoxDelegate, StorageCountryModel) {

			$ionicPlatform.ready(function () {


				$User.getAvatars().then(function (_response) {
					$log.info(_response);

				}, function (_error) {
					$log.info(_error);
				});
				$scope.placeholder = {};
				$scope.user = {};

				$scope.init = function () {
					var user = StorageUserModel.getCurrentUser();
					$scope.getAvailableAvatar();


					$scope.placeholder.name = 'Nombre';
					$scope.placeholder.last_name = 'Apellido';
					$scope.placeholder.phone = 'Teléfono';
					$scope.placeholder.address = 'Dirección';

					if (user.name !== null) {
						$scope.placeholder.name = user.name;
					}
					if (user.last_name !== null) {
						$scope.placeholder.last_name = user.last_name;
					}
					if (user.phone !== null) {
						$scope.placeholder.phone = user.phone;
					}
					if (user.address !== null) {
						$scope.placeholder.address = user.address;
					}

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

				$scope.getAvailableAvatar = function () {
					$User.getAvatars().then(function (_response) {
						$log.info(_response);
						$scope.avatars = _response.data;
						$timeout(function () {
							$ionicSlideBoxDelegate.update();
						});
					}, function (_error) {
						$log.error(_error);
					});
				};


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
						// this.Materialize.toast('Complete nombre', 4000);
						Utils.validateToast('COMPLETE_NAME_PROFILE');
						return;
					}

					if ($scope.user.last_name === undefined || $scope.user.last_name === '') {
						// this.Materialize.toast('Complete apellido', 4000);
						Utils.validateToast('COMPLETE_LAST_NAME_PROFILE');
						return;
					}
					if ($scope.user.phone === undefined || $scope.user.phone === '') {
						// this.Materialize.toast('Complete teléfono', 4000);
						Utils.validateToast('COMPLETE_PHONE_PROFILE');
						return;
					}
					if ($scope.user.address === undefined || $scope.user.address === '') {
						// this.Materialize.toast('Complete dirección', 4000);
						Utils.validateToast('COMPLETE_ADDRESS_PROFILE');
						return;
					}

					$User.updateUser(prepareUserData($scope.user)).then(function (_response) {
						StorageUserModel.setCurrentUser(_response.data);
						popUpService.showPopUpProfileCreate($scope.translations).then(function () {
							$state.go('dashboard');
						});
						$log.info(_response);
					}, function (_error) {
						$log.error(_error);
						popUpService.showPopUpProfileFail().then(function () {
							
							$state.go('settings');
						});
					});
				};

				function prepareUserData(_data) {
					var user = {};
					if (_data.name != undefined && _data.name != null && _data.name != '') {
						user.name = _data.name;
					}

					if (_data.last_name != undefined || _data.last_name != null || _data.last_name != '') {
						user.last_name = _data.last_name;
					}

					if (_data.phone != undefined || _data.phone != null || _data.phone != '') {
						user.phone = _data.phone;
					}

					if (_data.address != undefined || _data.address != null || _data.address != '') {
						user.address = _data.address;
					}

					user.country = StorageCountryModel.getSelectedCountry().name;
					user.city= '';
					user.profile = {};
					user.profile.avatar = $scope.avatars[$ionicSlideBoxDelegate.currentIndex()].avatar_url;


					return user;

				}



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
		}
	]);
}).call(this);