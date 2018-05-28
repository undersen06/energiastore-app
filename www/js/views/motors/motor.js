'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('MotorsController', ['$scope', '$state', '$ionicPlatform', 'StorageUserModel', '$Motors', '$ionicModal', 'popUpService', 'Utils', 'StorageMotor', '$log','$rootScope',
		function ($scope, $state, $ionicPlatform, StorageUserModel, $Motors, $ionicModal, popUpService, Utils, StorageMotor, $log,$rootScope) {


			$ionicPlatform.ready(function () {


				StorageUserModel.getCurrentUser();
				$scope.user = StorageUserModel.getCurrentUser();


				// if (window.cordova && window.cordova.plugins.Keyboard) {
				// 	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
				// }

				$scope.motors = [];
				$scope.motor = {};
				$scope.motor.voltaje = 380;
				$scope.user = StorageUserModel.getCurrentUser();
				$scope.quote = {
					calculation_id: '',
					user_id: '',
					comment: '',
					reference: ''
				};

				$scope.init = function () {
					
					$scope.getMotors();
				};

				$ionicModal.fromTemplateUrl('js/views/motors/create/motor.mdl.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function (modal) {
					$scope.modalMotor = modal;
				});


				$scope.openModalMotor = function () {

					$scope.modalMotor.show();
					setTimeout(function () {
						$('#voltaje-id').addClass('active');
						$('#rated-power-label').addClass('active');
						$scope.motor.voltaje = 380;
					}, 1);
				};
				$scope.closeModalMotor = function () {
					$scope.modalMotor.hide();
				};
				// Cleanup the modal when we're done with it!
				$scope.$on('$destroy', function () {
					$scope.modalMotor.remove();
				});
				// Execute action on hide modal
				$scope.$on('modalMotor.hidden', function () {
					// Execute action
				});
				// Execute action on remove modal
				$scope.$on('modalMotor.removed', function () {
					// Execute action
				});

				$scope.back = function () {
					$state.go('project');
				};

				$ionicPlatform.registerBackButtonAction(function () {
					$scope.back();
				}, 100);



				$scope.createMotor = function () {


					var aux = Object.assign({}, $scope.motor);

					if (aux.name === undefined || aux.name === '') {
						Utils.validateToast('MOTOR_COMPLETE_NAME');
						return;
					}

					if (aux.voltaje === undefined || aux.voltaje === 0) {
						Utils.validateToast('MOTOR_COMPLETE_VOLT');
						return;
					}

					if (aux.voltaje <= 0) {
						Utils.validateToast('MOTOR_COMPLETE_VOLTAJE_MINIMUM');
						// El voltaje debe ser mayor a 0
						return;
					}

					if (aux.amp === undefined || aux.amp === 0) {
						Utils.validateToast('MOTOR_COMPLETE_AMP');
						return;
					}

					if (aux.amp <= 0) {
						Utils.validateToast('MOTOR_COMPLETE_AMP_MINIMUM');
						// El amperaje debe ser mayor a 0
						return;
					}


					if (aux.power_factor === undefined || aux.power_factor === 0) {
						Utils.validateToast('MOTOR_COMPLETE_FTP');
						return;
					}


					if (aux.power_factor >= 10) {
						aux.power_factor = (aux.power_factor / 100);
					} else {
						aux.power_factor = (aux.power_factor / 10);
					}

					if (aux.power_factor > 1) {
						Utils.validateToast('Factor de potencia debe varia entre 0.0 y 1');
						return;
					}

					if (aux.power_factor < 0) {
						Utils.validateToast('Factor de potencia debe varia entre 0.0 y 1');
						return;
					}

					if (aux.rated_power === undefined || aux.rated_power === 0) {
						Utils.validateToast('MOTOR_COMPLETE_KW_EMPTY');
						// Los KW deben ser mayor a 0
						return;
					}

					if (aux.rated_power <= 0) {
						Utils.validateToast('MOTOR_COMPLETE_KW_MINIMUM');
						// El amperaje debe ser mayor a 0
						return;
					}


					if (aux.hours === undefined || aux.hours === 0) {
						Utils.validateToast('MOTOR_COMPLETE_HOURS_DAY');
						return;
					}

					if (aux.days === undefined || aux.days === 0) {
						Utils.validateToast('MOTOR_COMPLETE_DAYS_MONTH');
						return;
					}

					$Motors.create($scope.user, aux, $state.params.id_quotation).then(function (_response) {
						$scope.modalMotor.hide();
						Utils.validateToast('MOTOR_ADD_SUCCESS');
						$log.info(_response);
						$scope.getMotors();
						$scope.motor = {};
					}, function (_error) {
						// Materialize.toast("Problemas al agregar motor",4000);
						// $scope.modalMotor.hide();
						$scope.motor = {};
						Utils.validateToast('MOTOR_ADD_FAIL');
						$log.error(_error);
					});

				};


				$scope.getMotors = function () {
					$Motors.getByCalculation($state.params.id_quotation, StorageUserModel.getCurrentUser()).then(function (_response) {
						
						$scope.motors = _response.data;
						$scope.$broadcast('scroll.refreshComplete');

						if ($scope.motors == undefined || $scope.motors.length == 0 ) {
							$scope.motorButtonText = $rootScope.motors_t.BUTTON_ADD_MOTOR;
						} else {
							$scope.motorButtonText = $rootScope.motors_t.BUTTON_ADD_MORE_MOTORS;
						}

					}, function (_error) {
						$log.error(_error);
						$scope.$broadcast('scroll.refreshComplete');
					});

				};

				$scope.doRefreshMotors = function () {
					$scope.getMotors();
				};

				$scope.goToQuotation = function () {
					if ($scope.motors.length !== 0) {
						$state.go('finalizeQuotation', { id_quotation: $state.params.id_quotation });
					}else{
						Utils.validateToast('EMPTY_MOTORS_FINALIZE_QUOTATION');
					}
					// "MOTOR_COMPLETE_VOLTAJE_MINIMUM": "El voltaje debe ser mayor a 0",
					// 	"MOTOR_COMPLETE_AMP_MINIMUM": "El amperage debe ser mayor a 0",
					// 		"MOTOR_COMPLETE_KW_MINIMUM": "Los KW deben ser mayor a 0",
					// 			"MOTOR_COMPLETE_KW_EMPTY": "Complete KW del motor",
					// 				"": "Debes agregar al menos 1 motor.",
					// 					"MOTOR_SELECT_HOURS": "Seleccione las horas",
					// 						"MOTOR_SELECT_DAYS": "Seleccione los dias"
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

				$scope.motorButtonText = $rootScope.motors_t.BUTTON_ADD_MOTOR;
				$scope.project_name = $state.params.project_name || '';
				$scope.getMotors();

			});
		}]);
}).call(this);
