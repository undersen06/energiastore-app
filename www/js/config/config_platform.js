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
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				this.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				this.cordova.plugins.Keyboard.disableScroll(false);


				window.plugins.OneSignal.startInit('344f2a67-3475-4b44-8aeb-f5bcdab1049c')
					.endInit();

				window.plugins.OneSignal.getIds(function (ids) {
					$rootScope.user_id = ids.userId;
					$rootScope.pushToken = ids.pushToken;
				});

			}


			if (window.StatusBar) {
				// StatusBar.overlaysWebView(true);
				this.StatusBar.hide();
				this.StatusBar.overlaysWebView(true);
			}

		});
	});

	this.app.run(function ($state, $ionicPlatform, StorageUserModel, StorageLanguageModel, StorageStatus, StorageCountryModel) {

		$ionicPlatform.ready(function () {
			if (StorageUserModel.getCurrentUser()) {
				debugger;
				if (StorageUserModel.getCurrentUser().authentication_token === undefined) {


					if (StorageStatus.getStatus() !== undefined) {
						if (StorageStatus.getStatus().status == true) {
							$state.go('dashboard');
						} else {
							if (StorageLanguageModel.getCurrentLanguage() === undefined) {
								$state.go('welcome', {}, { reload: true });
							} else {
								$state.go('login', {}, { reload: true });
							}
						}
					} else {

						if (StorageLanguageModel.getCurrentLanguage() === undefined) {
							$state.go('welcome', {}, { reload: true });
						} else {
							$state.go('login', {}, { reload: true });
						}

					}
				} else {

					if (StorageLanguageModel.getCurrentLanguage() === undefined) {
						$state.go('welcome', {}, { reload: true });
					} else {
						$state.go('dashboard', {}, { reload: true });
					}
				}
			} else {
				debugger;

				if (StorageStatus.getStatus() !== undefined) {
					if (StorageStatus.getStatus().status == true) {
						$state.go('dashboard');
					} else {
						if (StorageLanguageModel.getCurrentLanguage() === undefined) {
							$state.go('welcome', {}, { reload: true });
						} else {
							$state.go('login', {}, { reload: true });
						}
					}
				} else {
					if (StorageLanguageModel.getCurrentLanguage() === undefined) {
						$state.go('welcome', {}, { reload: true });
					} else {
						if (StorageCountryModel.getSelectedCountry() === undefined || StorageCountryModel.getSelectedCurrency() === undefined) {
							$state.go('welcome', {}, { reload: true });
						} else {
							$state.go('login', {}, { reload: true });
						}

					}
				}
			}
		});


	});
}).call(this);
