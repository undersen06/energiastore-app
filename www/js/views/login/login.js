'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('LoginController', ['$scope', '$state', '$ionicPlatform', 'StorageUserModel', '$Session', '$cordovaStatusbar', '$ionicLoading', 'Utils', 'popUpService', 'StorageCountryModel', '$User', '$cordovaAppAvailability', '$log',
		function ($scope, $state, $ionicPlatform, StorageUserModel, $Session, $cordovaStatusbar, $ionicLoading, Utils, popUpService, StorageCountryModel, $User, $cordovaAppAvailability, $log) {


			// const CURRENT_VIEW = 'LOGIN';

			$scope.design = {};
			// cordova.plugins.Keyboard.close();



			if (StorageUserModel.getCurrentUser() != undefined) {
				switch (StorageUserModel.getCurrentUser().type_user) {
					case 'user':
						$scope.design.header = 'user-color';
						$scope.design.color = 'user-color-font';
						break;

					case 'partner':
						$scope.design.header = 'partner-color';
						$scope.design.color = 'partner-color-font';
						break;

					case 'explorer':
						$scope.design.header = 'explorer-color';
						$scope.design.color = 'explorer-color-font';
						break;
					default:
						$scope.design.header = 'user-color';
						$scope.design.color = 'user-color-font';
						break;
				}
			} else {

				$scope.design.header = 'user-color';
				$scope.design.color = 'user-color-font';
			}

			$ionicPlatform.ready(function () {
				// cordova.plugins.Keyboard.close();



				$scope.isIphoneX = function () {
					if (ionic.Platform.device().model != undefined) {
						if (ionic.Platform.device().model.startsWith('iPhone10')) {
							return true;
						}
					}
				};

				$scope.loginLinkedIn = function () {
					var onError = function () {
						popUpService.isWebViewLinkedInError('ERROR_LINKEDIN_LOGIN');
					};

					var onSuccess = function (r) {
						$User.registerUserLinkedin(r.emailAddress).then(function (_register_response) {
							$User.registerUserLinkedInInfo(_register_response.data, formatLinkedInUser(r)).then(function () {
								StorageUserModel.setCurrentUser(_register_response.data);
								$state.go('dashboard');
								$ionicLoading.hide();
							}, function (_error) {
								$ionicLoading.hide();
								$log.error(_error);
								//Email in use ...
								popUpService.emailAllReadyInUse();
							});

						}, function () {
							$ionicLoading.hide();
							popUpService.emailAllReadyInUse();
							// popUpService.isWebViewLinkedInError('ERROR_LINKEDIN_LOGIN')
						});
					};

					var scopes = ['r_emailaddress', 'r_basicprofile', 'rw_company_admin', 'w_share'];

					cordova.plugins.LinkedIn.hasActiveSession(function (_response) {
						$log.info(_response);
					}, function (_error) {
						$log.error(_error);
						popUpService.isWebViewLinkedInError('ERROR_LINKEDIN_APP_NOT_FOUND' || 'UNKNOWN_ERROR').then(function () {
						});
					});



					cordova.plugins.LinkedIn.login(scopes, true, function () {
						cordova.plugins.LinkedIn.getRequest('people/~:(id,num-connections,picture-url,email-address,first-name,last-name)', onSuccess, onError);
					}, onError);
				};


				$scope.useLinkedIn = function () {

					$ionicLoading.show({
						templateUrl: 'loading.html'
					});

					if (!ionic.Platform.isWebView()) {
						popUpService.isWebViewLinkedInError('ERROR_LINKEDIN_APP_NOT_FOUND').then(function () {

						});
					} else {
						$cordovaAppAvailability.check('linkedin://').then(function () {
							$scope.loginLinkedIn();
						}, function (_error) {
							$log.error(_error);
							popUpService.isWebViewLinkedInError('ERROR_LINKEDIN_APP_NOT_FOUND' || 'UNKNOWN_ERROR').then(function () {
								$ionicLoading.hide();

							});
						});
					}
				};


				$scope.user = {};

				$scope.goToRegister = function () {
					$state.go('register');

				};

				$scope.useFacebook = function () {
					if (!ionic.Platform.isWebView()) {
						popUpService.isWebViewFacebookError();
					} else {
						$ionicLoading.show({
							templateUrl: 'loading.html'
						});
						get_status_login();
					}


				};

				function login_facebook() {
					facebookConnectPlugin.login(['public_profile', 'email', 'user_friends'], function success(success) {
						get_facebook_user_info(success);
					},
						function loginError(error) {
							$log.error(error);
							$ionicLoading.hide();
						}
					);
				}

				function get_facebook_user_info(_data) {

					facebookConnectPlugin.api(_data.authResponse.userID + '/?fields=name,id,email', ['public_profile', 'email'],
						function onSuccess(result) {

							if (result.email == undefined) {
								popUpService.showPopupFacebookEmailError();
								$ionicLoading.hide();
							} else {

								$User.registerUserFacebook(_data.authResponse.userID).then(function (_response) {
									
									var country = StorageCountryModel.getSelectedCountry().name;
									$User.updateCountry(_response.data, country).then(function (_response_country) {
										$log.info(_response_country);
										$User.registerUserFacebookInfo(_response.data, result).then(function (_response_user) {
											
											$ionicLoading.hide();
											$log.info(_response_user);
											StorageUserModel.setCurrentUser(_response.data);
											$state.go('dashboard');


										}, function (_error) {
											
											$ionicLoading.hide();
											$log.error(_error);
										});
									}, function (_error) {
										
										$ionicLoading.hide();
										$log.error(_error);
									});
								}, function (_error) {
									
									$ionicLoading.hide();
									$log.error(_error);
								});
							}
						}, function onError(error) {
							
							$log.error(error);
						}
					);
				}


				function get_status_login() {
					facebookConnectPlugin.getLoginStatus(function success(success) {

						if (success.status == 'connected') {
							$Session.loginFacebook(success.authResponse.userID).then(function (_response) {
								$ionicLoading.hide();
								StorageUserModel.setCurrentUser(_response.data);
								$state.go('dashboard');

							}, function () {
								login_facebook(status);

							});

						} else {

							login_facebook(status);
						}


						// get_facebook_user_info();

					}, function failure() {
						//TODO:
						popUpService.isWebViewFacebookError('*****').then(function () {

						});


					});
				}


				$scope.initLogin = function () {
					if ($scope.user.email === undefined || $scope.user.email === '') {
						Utils.validateToast('COMPLETE_EMAIL');
						return;
					}

					if ($scope.user.password === undefined || $scope.user.password === '') {
						Utils.validateToast('COMPLETE_PASSWORD');
						return;
					}

					$ionicLoading.show({
						templateUrl: 'loading.html'
					});

					$Session.login($scope.user).then(function (_response) {
						// Login success
						StorageUserModel.setCurrentUser(_response.data);
						$User.updateCountry(StorageUserModel.getCurrentUser(), StorageCountryModel.getSelectedCountry().name).then(function (_success) {
							$log.info(_success);
							// Country updated

						}, function (_error) {
							// Cannot update the countries
							popUpService.error(_error);
						});


						$state.go('dashboard');
						$ionicLoading.hide();
					}, function (_error) {
						Utils.validateToast(_error.USER_ERROR_CODE);
						$ionicLoading.hide();
					});
				};

				$ionicPlatform.registerBackButtonAction(function () {
					$state.Back();
				}, 100);

				$scope.Back = function () {
					$state.go('middleware');
				};

				function formatLinkedInUser(_r) {
					var user = {
						email: _r.emailAddress,
						name: _r.firstName,
						last_name: _r.lastName
					};
					return user;
				}


				// "ERROR_LINKEDIN_LOGIN"
				// "ERROR_LINKEDIN_APP_NOT_FOUND"
				// "ERROR_LINKEDIN_IS_WEBVIEW"




			});
		}]);
}).call(this);
