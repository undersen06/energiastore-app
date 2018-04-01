'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('ProjectController', ['$scope', '$state', '$ionicPlatform', '$ionicPopup', 'StorageUserModel', '$Calculation', 'IonicClosePopupService', 'Utils', '$ionicLoading', 'httpUtilities', 'popUpService', 'StorageProject', '$Quotation', '$cordovaActionSheet', '$cordovaStatusbar', '$Motors', 'StorageCountryModel', '$rootScope', '$log', '$Providers', '$ionicModal',
		function ($scope, $state, $ionicPlatform, $ionicPopup, StorageUserModel, $Calculation, IonicClosePopupService, Utils, $ionicLoading, httpUtilities, popUpService, StorageProject, $Quotation, $cordovaActionSheet, $cordovaStatusbar, $Motors, StorageCountryModel, $rootScope, $log, $Providers, $ionicModal) {


			$scope.currency = StorageCountryModel.getSelectedCurrency().symbol;
			$scope.price = StorageCountryModel.getSelectedCountry().energy_cost;


			$ionicPlatform.ready(function () {
				var projectPopUp;
				$scope.has_quotation = false;
				$scope.calculations = {};
				$scope.user = StorageUserModel.getCurrentUser();

				$scope.back = function () {
					$state.go('dashboard');
				};

				$scope.init = function () {
					$ionicLoading.show({
						templateUrl: 'loading.html'
					}).then(function () {
						$scope.getCalculation();
					});
				};

				$scope.doRefreshQuotation = function () {
					$scope.getCalculation();
				};


				$ionicModal.fromTemplateUrl('js/views/project/create/create.mdl.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function (modal) {
					$scope.modalProject = modal;
				});

				$scope.openModal = function () {
					$scope.modalProject.show();
				};
				$scope.closeModalMotor = function () {
					$scope.modalProject.hide();
				};
				$scope.$on('$destroy', function () {
					$scope.modalProject.remove();
				});
				
				$scope.$on('modalProject.hidden', function () {
				});
				
				$scope.$on('modalProject.removed', function () {	
				});

				$scope.createCalculation = function (data) {
					$Calculation.create(data, StorageUserModel.getCurrentUser()).then(
						function (_response) {
							$log.info(_response);
							Utils.validateToast($scope.translations.QUOTATION_CREATED_MESSAGE);
							$scope.calculations = {};
							$scope.getCalculation();
							if (this.cordova.plugins) {
								this.cordova.plugins.Keyboard.close();
							}
						},
						function (_error) {
							Utils.validateToast($scope.translations.QUOTATION_FAIL_MESSAGE);
							$log.error(_error);

						}
					);
				};

				$scope.getCalculation = function () {
					$Calculation.getAll(StorageUserModel.getCurrentUser()).then(
						function (_response) {
							$scope.calculations = _response.data;
							$scope.$broadcast('scroll.refreshComplete');
							$ionicLoading.hide();
						},
						function (_error) {
							$ionicLoading.hide();
							httpUtilities.validateHTTPResponse(_error, popUpService, $scope.translations);

							// Utils.validateToast($scope.translations.QUOTATION_ERROR_DOWNLOAD_INFO);
							$scope.$broadcast('scroll.refreshComplete');
						}
					);
				};

				$scope.goToCalculation = function (calculation) {
					var queries = {
						id_quotation: calculation.id,
						project_name: calculation.name || ''
					};

					$state.go('motors', queries, { reload: true });
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

				$scope.showPDF = function (values) {
					if (StorageUserModel.getCurrentUser().type_user !== 'explorer') {
						$scope.getAvailablePDF(values);
					}
				};

				$scope.getAvailablePDF = function (value) {
					$Quotation.getAvailablePDFById(StorageUserModel.getCurrentUser(), value.id).then(function (_response) {
						$log.info(_response);

					}, function (_error) {
						$log.info(_error);

					});
				};

				$scope.shouldShowDelete = false;
				$scope.shouldShowReorder = false;
				$scope.listCanSwipe = true;

				$scope.getProviders = function () {
					$Providers.getProviders().then(function (_response) {
						$log.info(_response);
						$scope.providers = _.filter(_response.data, { 'country_id': StorageCountryModel.getSelectedCountry().id });

					}, function (_error) {
						$log.error(_error);

					});
				};



				$ionicPlatform.registerBackButtonAction(function () {
					$state.go('dashboard');
				}, 100);


				$scope.duplicateProject = function (calculation) {

					$ionicLoading.show({
						templateUrl: 'loading.html'
					}).then(function () {

						calculation.name = calculation.name + '_duplicated';

						$Calculation.create(calculation, StorageUserModel.getCurrentUser()).then(
							function (_response) {
								$log.info(_response);
								$scope.getMotors(calculation.id, _response.data.id);
							},
							function (_error) {
								Utils.validateToast($scope.translations.QUOTATION_FAIL_MESSAGE);
								$log.error(_error);
							}
						);
					});
				};

				$scope.getMotors = function (old_calculation_id, new_calculation_id) {
					$Motors.getByCalculation(old_calculation_id, StorageUserModel.getCurrentUser()).then(function (_response) {
						$scope.insertMotors(_response.data, new_calculation_id);
						$log.error(_response);

					}, function (_error) {
						$log.error(_error);
						$scope.$broadcast('scroll.refreshComplete');
					});
				};

				$scope.insertMotors = function (motors, old_calculation_id) {
					for (var i = 0; i <= motors.length - 1; i++) {
						var motor = motors[i];
						var _motor = {
							calculation_id: old_calculation_id,
							name: motor.name,
							rated_power: motor.rated_power, //potencia
							hours: motor.hours,
							voltaje: motor.volts,
							amp: motor.amp,
							power_factor: motor.fdp
						};

						$Motors.create(StorageUserModel.getCurrentUser(), _motor, old_calculation_id).then(function (_response) {
							$log.info(_response);
							$ionicLoading.hide();
						}, function (_error) {
							$log.error(_error);
						});
					}
				};

				$scope.closePopUp = function () {
					projectPopUp.close();
				};

				$scope.getProviders();

			});
		}
	]);
}.call(this));
