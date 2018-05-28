'use strict';
/*
=========================================
PLATFORM CONFIGURATION
=========================================
*/

(function () {
	this.app.run(function ($ionicPlatform, $rootScope) {

		$ionicPlatform.ready(function () {

			if (window.cordova && window.cordova.plugins.Keyboard) {
				Keyboard.hideFormAccessoryBar(false);
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				// cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                // cordova.plugins.Keyboard.disableScroll(true);


				window.plugins.OneSignal.startInit('344f2a67-3475-4b44-8aeb-f5bcdab1049c')
					.endInit();

				window.plugins.OneSignal.getIds(function (ids) {
					$rootScope.user_id = ids.userId;
					$rootScope.pushToken = ids.pushToken;
				});

			}


			if (window.StatusBar) {
				// StatusBar.overlaysWebView(true);

				// StatusBar.hide();
				// StatusBar.overlaysWebView(true);
			}

		});
	});

	this.app.run(function ($state, $ionicPlatform, StorageUserModel, StorageLanguageModel, StorageStatus, StorageCountryModel) {

		$ionicPlatform.ready(function () {
			if (StorageUserModel.getCurrentUser()) {
				if (StorageUserModel.getCurrentUser().authentication_token === undefined) {

					if (StorageStatus.getStatus() !== undefined) {
						if (StorageStatus.getStatus().status == true) {
							$state.go('dashboard');
						} else {
							if (StorageLanguageModel.getCurrentLanguage() === undefined) {
								$state.go('welcome', {}, {
									reload: true
								});
							} else {
								$state.go('login', {}, {
									reload: true
								});
							}
						}
					} else {

						if (StorageLanguageModel.getCurrentLanguage() === undefined) {
							$state.go('welcome', {}, {
								reload: true
							});
						} else {
							$state.go('login', {}, {
								reload: true
							});
						}

					}
				} else {

					if (StorageLanguageModel.getCurrentLanguage() === undefined) {
						$state.go('welcome', {}, {
							reload: true
						});
					} else {
						$state.go('dashboard', {}, {
							reload: true
						});
					}
				}
			} else {

				if (StorageStatus.getStatus() !== undefined) {
					if (StorageStatus.getStatus().status == true) {
						$state.go('dashboard');
					} else {
						if (StorageLanguageModel.getCurrentLanguage() === undefined) {
							$state.go('welcome', {}, {
								reload: true
							});
						} else {
							$state.go('login', {}, {
								reload: true
							});
						}
					}
				} else {
					if (StorageLanguageModel.getCurrentLanguage() === undefined) {
						$state.go('welcome', {}, {
							reload: true
						});
					} else {
						if (StorageCountryModel.getSelectedCountry() === undefined || StorageCountryModel.getSelectedCurrency() === undefined) {
							$state.go('welcome', {}, {
								reload: true
							});
						} else {
							$state.go('login', {}, {
								reload: true
							});
						}

					}
				}
			}
		});

	});

	this.app.run(function ($state, $ionicPlatform, $Localization, $rootScope, StorageUserModel) {
		$Localization.getTranslation();

		$rootScope.design = {};
		if (StorageUserModel.getCurrentUser() != undefined) {
			switch (StorageUserModel.getCurrentUser().type_user) {
			case 'user':

				$rootScope.design.header = 'user-color';
				$rootScope.design.footer = 'user-color';
				$rootScope.design.button = 'user-color-button';
				$rootScope.design.buttonSolid = 'user-color-button-solid';
				break;

			case 'partner':
				$rootScope.design.header = 'partner-color';
				$rootScope.design.footer = 'partner-color';
				$rootScope.design.button = 'partner-color-button';
				$rootScope.design.buttonSolid = 'partner-color-button-solid';
				break;

			case 'explorer':
				$rootScope.design.header = 'explorer-color';
				$rootScope.design.footer = 'explorer-color';
				$rootScope.design.button = 'explorer-color-button';
				$rootScope.design.buttonSolid = 'explorer-color-button-solid';
				break;
			default:
				$rootScope.design.header = 'user-color';
				$rootScope.design.footer = 'user-color';
				$rootScope.design.button = 'user-color-button';
				$rootScope.design.buttonSolid = 'user-color-button-solid';
				break;
			}
		}else{
			$rootScope.design.header = 'user-color';
			$rootScope.design.footer = 'user-color';
			$rootScope.design.button = 'user-color-button';
			$rootScope.design.buttonSolid = 'user-color-button-solid';
		}

	});

}).call(this);