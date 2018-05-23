

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('WelcomeController', ['$scope', '$state', '$ionicPlatform', '$cordovaStatusbar', '$ionicSlideBoxDelegate', 'StorageLanguageModel', '$Country', 'StorageCountryModel', '$q', 'popUpService', 'StorageUserModel', '$User', '$log','$Localization',
		function ($scope, $state, $ionicPlatform, $cordovaStatusbar, $ionicSlideBoxDelegate, StorageLanguageModel, $Country, StorageCountryModel, $q, popUpService, StorageUserModel, $User, $log, $Localization) {
			'use strict';
			$ionicPlatform.ready(function () {

				$ionicSlideBoxDelegate.enableSlide(false);

				$scope.isIphoneX = function () {
					if (ionic.Platform.device().model != undefined) {
						if (ionic.Platform.device().model.startsWith('iPhone10')) {
							return true;
						}
					}
				};

				function loadCountries() {

					var promises = [$Country.getAllCurrencies(), $Country.getAllCountries()];


					$q.all(promises).then(function (_resolves) {
						$scope.currencies = _resolves[0].data;
						$scope.countries = _resolves[1].data;

					}, function (_error) {
						$log.error(_error);

						popUpService.showPopupCountries().then(function () {
							loadCountries();
						});
					});
				}





				$scope.chooseLanguage = function (_language) {
					StorageLanguageModel.setCurrentLanguage(_language);
					$Localization.getTranslation();
					$ionicSlideBoxDelegate.slide(1);
					

				};
				$scope.chooseCountry = function (country) {



					var _country = _.find($scope.countries, { 'id': country.id });
					var currency = _.find($scope.currencies, { 'id': _country.currency_id });


					StorageCountryModel.selectCountry(_country);
					StorageCountryModel.selectCurrency(currency);

					if (StorageUserModel.getCurrentUser() != undefined) {
						if (StorageUserModel.getCurrentUser().id != undefined) {
							$User.updateCountry(StorageUserModel.getCurrentUser(), _country.name).then(function () {

							}, function (_error) {
								$log.error(_error);
								popUpService.workingOnPopUp();
							});
						}
					}

					$state.go('introduction');

				};

				$scope.stop = function () {
					$ionicSlideBoxDelegate.enableSlide(false);
				};


				loadCountries();

			});
		}]);
}).call();
