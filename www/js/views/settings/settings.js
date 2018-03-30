'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('SettingsController', ['$scope', '$state','$ionicPlatform','$resource','translationService','$cordovaStatusbar','$ionicSlideBoxDelegate','$timeout','StorageUserModel','StorageLanguageModel','$ionicPopup','$cordovaActionSheet','StorageStatus','StorageProject','StorageMotor','StorageQuotation','$ionicModal','User','$ionicLoading','popUpService','$Country','$q','StorageCountryModel',
		function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,StorageUserModel,StorageLanguageModel,$ionicPopup,$cordovaActionSheet,StorageStatus,StorageProject,StorageMotor,StorageQuotation,$ionicModal,User,$ionicLoading,popUpService,$Country,$q,StorageCountryModel) {

			$scope.user = StorageUserModel.getCurrentUser();

			$ionicPlatform.ready(function() {

				const languageFilePath = translationService.getTranslation();
				$resource(languageFilePath).get(function (data) {
					$scope.translations = data;
					$scope.options = { title: $scope.translations.CHOOSE_LANGUAGE_TEXT, buttonLabels: [$scope.translations.CHOOSE_LANGUAGE_ENGLISH,$scope.translations.CHOOSE_LANGUAGE_SPANISH], addCancelButtonWithLabel: $scope.translations.CHOOSE_LANGUAGE_CANCEL, androidEnableCancelButton: true, winphoneEnableCancelButton: true };
					$scope.button_exit_lesson = [{ text: $scope.translations.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function() {
					}}];
					// $scope.init();
				});


				$scope.register = {};
				$scope.modalChooseCountry={};

				$scope.goToProfile =  function(){
					$state.go('profile');
				};
				$scope.chooseLanguaje =  function(){
					$scope.showLanguageOptions();
				};
				$scope.chooseCountry =  function(){

				};

				$scope.goToTutorials =  function(){
					$state.go('tutorials');
				};

				$scope.goBack = function(){
					$state.go('dashboard');
				};

				$scope.FAQ =  function(){
					$scope.workingOnPopUp();
				};


				$scope.logOut = function (){
					$ionicPopup.show({
						animation: 'fade-in',
						title: '<img src="assets/img/logout.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${$scope.translations.LOG_OUT_TITLE}</span>`,
						template: `<p class="popup-subtitle">${$scope.translations.LOG_OUT_TEXT}</p>`,
						scope: $scope,
						buttons: [{
							text: `${$scope.translations.LOG_OUT_CANCEL_BUTTON}`,
							type: 'button-cancel'
						},
						{
							text: `${$scope.translations.LOG_OUT_LEAVE_BUTTON}`,
							type: 'button-afirmative',
							onTap: function() {
								$scope.deleteData();
							}
						}
						]
					});
				};


				$scope.workingOnPopUp = function(){
					$ionicPopup.show({
						animation: 'fade-in',
						title: '<img src="assets/img/working-on.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${$scope.translations.WORKING_ON_TITLE}</span>`,
						template: `<p class="popup-subtitle">${$scope.translations.WORKING_ON_TEXT}</p>`,
						scope: $scope,
						buttons: [
							{
								text: `${$scope.translations.WORKING_ON_BUTTON_TEXT}`,
								type: 'button-afirmative',
								onTap: function() {
								}
							}]
					});
				};

				$scope.aboutUs = function(){
					$ionicPopup.show({
						animation: 'fade-in',
						title: '<img src="assets/img/logo.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${$scope.translations.ABOUT_US_TITLE}</span>`,
						template: `<p class="popup-subtitle">${$scope.translations.ABOUT_US_TEXT}</p> `,
						scope: $scope,
						buttons: [
							{
								text: `${$scope.translations.ABOUT_US_BUTTON_TEXT}`,
								type: 'button-afirmative',
								onTap: function() {
									// $state.go('middleware')
								}
							}
						]
					});
				};


				if (window.cordova){
					$scope.showLanguageOptions = function(){
						$cordovaActionSheet
							.show($scope.options)
							.then(function(btnIndex) {
								switch (btnIndex) {
								case 1:
									StorageLanguageModel.setCurrentLanguage('en');
									break;

								case 2:
									StorageLanguageModel.setCurrentLanguage('es');
									break;
								}

								StorageLanguageModel.getCurrentLanguage();

								const languageFilePath = translationService.getTranslation();
								$resource(languageFilePath).get(function(data) {
									$scope.translations = data;
									$scope.options = { title: $scope.translations.CHOOSE_LANGUAGE_TEXT, buttonLabels: [$scope.translations.CHOOSE_LANGUAGE_ENGLISH,$scope.translations.CHOOSE_LANGUAGE_SPANISH], addCancelButtonWithLabel: $scope.translations.CHOOSE_LANGUAGE_CANCEL, androidEnableCancelButton: true, winphoneEnableCancelButton: true };
								});
							});
					};
				}


				$scope.deleteData= function (){
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

				}).then(function(modal) {
					$scope.modalChooseCountry = modal;
					$scope.modalChooseCountry.hardwareBackButtonClose = false;
				});


				$scope.openModalChooseCountry = function() {
					$scope.modalChooseCountry.show();
				};
				$scope.closeModalChooseCountry = function() {
					$scope.modalChooseCountry.hide();
				};
				// Cleanup the modal when we're done with it!
				$scope.$on('$destroy', function() {
					$scope.modalChooseCountry.remove();
				});
				// Execute action on hide modal
				$scope.$on('modalChooseCountry.hidden', function() {
					// Execute action
				});
				// Execute action on remove modal
				$scope.$on('modalChooseCountry.removed', function() {
					// Execute action
				});


				$scope.chooseCountry = function(country){
					User.updateCountry($scope.user,country.name).then(function(_success){
						StorageCountryModel.selectCountry(country);
						StorageCountryModel.selectCurrency(this._.find($scope.curencies, { 'id': country.currency_id}));
					},function(_error){
						// debugger;

					});


					$scope.closeModalChooseCountry();
				};


				function loadCountries(){
					var promises =[$Country.getAllCurrencies(),$Country.getAllCountries()];
					$q.all(promises).then(function(_resolves){
						$scope.curencies = _resolves[0].data;
						$scope.countries = _resolves[1].data;
					},function(_error){
						popUpService.showpopupCountries().then(function(_response){
							loadCountries();
						});
					});
				}



				loadCountries();

			});
		}]);
}).call(this);
