'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('LoginController', ['$scope', '$state', '$ionicPlatform', 'StorageUserModel', '$Session', 'translationService', '$resource', '$cordovaStatusbar', '$ionicLoading', 'Utils', 'popUpService', 'StorageCountryModel', '$User', '$cordovaAppAvailability',
		function ($scope, $state, $ionicPlatform, StorageUserModel, $Session, translationService, $resource, $cordovaStatusbar, $ionicLoading, Utils, popUpService, StorageCountryModel, $User, $cordovaAppAvailability) {

			$scope.design = {};

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

				$scope.isIphoneX = function () {
					if (this.ionic.Platform.device().model != undefined) {
						if (this.ionic.Platform.device().model.startsWith('iPhone10')) {
							return true;
						}
					}
				};




				$scope.loginLinkedIn = function () {
					var onError = function (e) {

						console.error('LinkedIn Error: ', e);
					};


					var onSuccess = function (r) {
						$User.registerUserLinkedin(r.emailAddress).then(function (_register_response) {



							$User.registerUserLinkedInInfo(_register_response.data, formatLinkedInUser(r)).then(function (_info_response) {
								StorageUserModel.setCurrentUser(_register_response.data);
								$state.go('dashboard');

							}, function (_register_error) {



							});


						}, function (_error) {



						});

					};



					var scopes = ['r_emailaddress', 'r_basicprofile', 'rw_company_admin', 'w_share'];

					this.cordova.plugins.LinkedIn.hasActiveSession(function (_response) {
						console.log('response' + _response);

					}, function (_error) {
						console.log('error' + _error);

					});



					this.cordova.plugins.LinkedIn.login(scopes, true, function (_response) {

						// get connections
						this.cordova.plugins.LinkedIn.getRequest('people/~:(id,num-connections,picture-url,email-address,first-name,last-name)', onSuccess, onError);

						// share something on profile
						// see more info at https://developer.linkedin.com/docs/share-on-linkedin
						// var payload = {
						//   comment: 'Hello world!',
						//   visibility: {
						//     code: 'anyone'
						//   }
						// };
						// cordova.plugins.LinkedIn.postRequest('~/shares', payload, onSuccess, onError);

					}, onError);
				};


				$scope.useLinkedIn = function () {

					if (!ionic.Platform.isWebView()) {
						//TODO PopUp indicando que es web 
					} else {

						$cordovaAppAvailability.check('linkedin://').then(function () {
							$scope.loginLinkedIn();
						}, function (_error) {

							// showpopUp error


						});
					}
				};

				const languageFilePath = translationService.getTranslation();
				$resource(languageFilePath).get(function (data) {
					$scope.translations = data;
				});

				$scope.user = {};

				$scope.goToRegister = function () {
					$state.go('register');

				};

				$scope.useFacebook = function () {
					if (!ionic.Platform.isWebView()) {
						// TODO crear popup de facebook 
					} else {

						get_status_login();
					}


				};

				function login_facebook() {
					facebookConnectPlugin.login(['public_profile', 'email', 'user_friends'], function success(success) {
						get_facebook_user_info(success);
					},
						function loginError(error) {
							console.error(error);
						}
					);
				}

				function get_facebook_user_info(_data) {

					facebookConnectPlugin.api(_data.authResponse.userID + '/?fields=name,id,email', ['public_profile', 'email'],
						function onSuccess(result) {


							console.log('Result: ', result);



							if (result.email == undefined) {

								popUpService.showpopupFacebookEmailError();

							} else {

								$User.registerUserFacebook(_data.authResponse.userID).then(function (_response) {
									var country = StorageCountryModel.getSelectedCountry().name;
									$User.updateCountry(_response.data, country).then(function (_response_country) {
										$User.registerUserFacebookInfo(_response.data, result).then(function (_response_user) {

											StorageUserModel.setCurrentUser(_response.data);
											$state.go('dashboard');


										}, function (_error) {
										});
									}, function (_error) {
									});
								}, function (_error) {
								});
							}
						}, function onError(error) {

							console.error('Failed: ', error);
						}
					);
				}


				function get_status_login() {
					facebookConnectPlugin.getLoginStatus(function success(success) {

						// popUpService.showpopupFacebookEmailError()

						if (success.status == 'connected') {
							$Session.loginFacebook(success.authResponse.userID).then(function (_response) {
								StorageUserModel.setCurrentUser(_response.data);
								$state.go('dashboard');

							}, function (_error) {
								login_facebook(status);

							});

						} else {

							login_facebook(status);

						}


						// get_facebook_user_info();

					}, function failure(error) {

					});
				}


				$scope.login = function () {
					if ($scope.user.email === undefined || $scope.user.email === '') {
						Utils.validateToast($scope.translations.LOGIN_EMAIL_EMPTY_ERROR);
						return;
					}

					if ($scope.user.password === undefined || $scope.user.password === '') {
						Utils.validateToast($scope.translations.LOGIN_PASSWORD_EMPTY_ERROR);
						return;
					}

					$ionicLoading.show({
						templateUrl: 'loading.html'
					});

					$Session.login($scope.user).then(function (_response) {
						// Login success
						StorageUserModel.setCurrentUser(_response.data);
						$User.updateCountry(StorageUserModel.getCurrentUser(), StorageCountryModel.getSelectedCountry().name).then(function (_success) {
							// Country uodated

						}, function (_error) {
							// Cannot update the countries
							popUpService.error(_error);
						});


						$state.go('dashboard');
						$ionicLoading.hide();
					}, function (_error) {
						// Cannot Login user
						this.Materialize.toast($scope.translations.LOGIN_ERROR, 4000);
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


			});
		}]);
}).call(this);
