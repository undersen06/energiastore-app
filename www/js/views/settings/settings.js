'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('SettingsController', ['$scope', '$state', '$ionicPlatform', '$cordovaStatusbar', '$ionicSlideBoxDelegate', '$timeout', 'StorageUserModel', 'StorageLanguageModel', '$ionicPopup', '$cordovaActionSheet', 'StorageStatus', 'StorageProject', 'StorageMotor', 'StorageQuotation', '$ionicModal', '$User', '$ionicLoading', 'popUpService', '$Country', '$q', 'StorageCountryModel', '$rootScope', '$cordovaAppVersion', '$log', '$Localization',
		function ($scope, $state, $ionicPlatform, $cordovaStatusbar, $ionicSlideBoxDelegate, $timeout, StorageUserModel, StorageLanguageModel, $ionicPopup, $cordovaActionSheet, StorageStatus, StorageProject, StorageMotor, StorageQuotation, $ionicModal, $User, $ionicLoading, popUpService, $Country, $q, StorageCountryModel, $rootScope, $cordovaAppVersion, $log, $Localization) {

			$scope.user = StorageUserModel.getCurrentUser();

			$scope.options = {
				title: $rootScope.settings.OPTIONS.COUNTRY.CHOOSE_LANGUAGE_TEXT,
				buttonLabels: [$rootScope.settings.OPTIONS.COUNTRY.CHOOSE_LANGUAGE_ENGLISH, $rootScope.settings.OPTIONS.COUNTRY.CHOOSE_LANGUAGE_SPANISH],
				addCancelButtonWithLabel: $rootScope.settings.OPTIONS.COUNTRY.CHOOSE_LANGUAGE_CANCEL,
				androidEnableCancelButton: true,
				winphoneEnableCancelButton: true
			};

			$ionicPlatform.ready(function () {

				$scope.register = {};
				$scope.modalChooseCountry = {};

				$scope.goToProfile = function () {
					$state.go('profile');
				};
				$scope.chooseLanguage = function () {
					$scope.showLanguageOptions();
				};
				$scope.chooseCountry = function () {

				};

				$scope.goToTutorials = function () {
					$state.go('tutorials');
				};

				$scope.goBack = function () {
					$state.go('dashboard');
				};

				$scope.FAQ = function () {
					popUpService.workingOnPopUp();
				};


				$scope.logOut = function () {
					$ionicPopup.show({
						animation: 'fade-in',
						title: '<img src="assets/img/logout.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${$rootScope.settings.LOG_OUT_TITLE}</span>`,
						template: `<p class="popup-subtitle">${$rootScope.settings.LOG_OUT_TEXT}</p>`,
						scope: $scope,
						buttons: [{
							text: `${$rootScope.settings.LOG_OUT_CANCEL_BUTTON}`,
							type: 'button-cancel'
						},
						{
							text: `${$rootScope.settings.LOG_OUT_LEAVE_BUTTON}`,
							type: 'button-affirmative',
							onTap: function () {
								$scope.deleteData();
							}
						}
						]
					});
				};



				$scope.aboutUs = function () {
					$cordovaAppVersion.getVersionNumber().then(function (version) {
						$ionicPopup.show({
							animation: 'fade-in',
							title: '<img src="assets/img/logo.png" class="img-about-us">',
							subTitle: `<span class="popup-title">${$rootScope.settings.ABOUT_US_TITLE}</span>`,
							template: `<p class="popup-subtitle">${$rootScope.settings.ABOUT_US_TEXT}</p> 
							<p class="popup-subtitle">${version}</p> `,
							scope: $scope,
							buttons: [{
								text: `${$rootScope.settings.ABOUT_US_BUTTON_TEXT}`,
								type: 'button-affirmative',
								onTap: function () {
									// $state.go('middleware')
								}
							}]
						});

					}, false);
				};



				$scope.showLanguageOptions = function () {

					$cordovaActionSheet.show($scope.options).then(function (btnIndex) {

						switch (btnIndex) {
						case 1:
							StorageLanguageModel.setCurrentLanguage('en');
							$Localization.getTranslation();
							break;

						case 2:
							StorageLanguageModel.setCurrentLanguage('es');
							$Localization.getTranslation();
							break;
						}

					}, function (_error) {
						$log.error(_error);
					});
				};



				$scope.deleteData = function () {
					StorageUserModel.destroyCurrentUser();
					StorageStatus.destroyStatus();
					StorageProject.destroyProjects();
					StorageMotor.destroyMotors();
					StorageQuotation.destroyQuotation();
					setTimeout(function () {
						$state.go('welcome');
					}, 100);
				};



				$ionicModal.fromTemplateUrl('js/views/settings/options/country/country.mdl.html', {
					scope: $scope,
					animation: 'slide-in-up'

				}).then(function (modal) {
					$scope.modalChooseCountry = modal;
					$scope.modalChooseCountry.hardwareBackButtonClose = false;
				});


				$scope.openModalChooseCountry = function () {
					$scope.modalChooseCountry.show();
				};
				$scope.closeModalChooseCountry = function () {
					$scope.modalChooseCountry.hide();
				};
				// Cleanup the modal when we're done with it!
				$scope.$on('$destroy', function () {
					$scope.modalChooseCountry.remove();
				});
				// Execute action on hide modal
				$scope.$on('modalChooseCountry.hidden', function () {
					// Execute action
				});
				// Execute action on remove modal
				$scope.$on('modalChooseCountry.removed', function () {
					// Execute action
				});


				$scope.chooseCountry = function (country) {
					$User.updateCountry($scope.user, country.name).then(function (_success) {
						$log.info(_success);
						StorageCountryModel.selectCountry(country);
						StorageCountryModel.selectCurrency(this._.find($scope.currencies, {
							'id': country.currency_id
						}));
					}, function (_error) {
						$log.error(_error);
						popUpService.workingOnPopUp();
					});
					$scope.closeModalChooseCountry();
				};


				function loadCountries() {
					var promises = [$Country.getAllCurrencies(), $Country.getAllCountries()];
					$q.all(promises).then(function (_resolves) {
						$scope.currencies = _resolves[0].data;
						$scope.countries = _resolves[1].data;
					}, function () {
						popUpService.showPopupCountries().then(function () {
							loadCountries();
						});
					});
				}

				loadCountries();

			});
		}
	]);
}).call(this);