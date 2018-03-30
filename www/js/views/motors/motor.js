'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('MotorsController', ['$scope', '$state','$ionicPlatform','StorageUserModel','$Motors','$ionicModal','popUpService','$resource','translationService','$cordovaStatusbar','Utils','StorageMotor',
		function($scope, $state,$ionicPlatform,StorageUserModel,$Motors,$ionicModal,popUpService,$resource,translationService,$cordovaStatusbar,Utils,StorageMotor) {

			$scope.design = {};
			switch (StorageUserModel.getCurrentUser().type_user) {
			case 'user':

				$scope.design.header = 'user-color';
				$scope.design.footer = 'user-color';
				$scope.design.button = 'user-color-button';
				$scope.design.buttonSolid = 'user-color-button-solid';
				break;

			case 'partner':
				$scope.design.header = 'partner-color';
				$scope.design.footer = 'partner-color';
				$scope.design.button = 'partner-color-button';
				$scope.design.buttonSolid = 'partner-color-button-solid';
				break;

			case 'explorer':
				$scope.design.header = 'explorer-color';
				$scope.design.footer = 'explorer-color';
				$scope.design.button = 'explorer-color-button';
				$scope.design.buttonSolid = 'explorer-color-button-solid';
				break;
			default:
				$scope.design.header = 'user-color';
				$scope.design.footer = 'user-color';
				$scope.design.button = 'user-color-button';
				$scope.design.buttonSolid = 'user-color-button-solid';
				break;
			}


			$ionicPlatform.ready(function() {

				const languageFilePath = translationService.getTranslation();
				$resource(languageFilePath).get(function (data) {
					$scope.translations = data;
					$scope.init();
				});

				StorageUserModel.getCurrentUser();
				$scope.user = StorageUserModel.getCurrentUser();


				if(window.cordova && window.cordova.plugins.Keyboard) {
					this.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
				}

				$scope.motors =[];
				$scope.motor = {};
				$scope.motor.voltaje=380;
				$scope.user = StorageUserModel.getCurrentUser();
				$scope.quote={
					calculation_id:'',
					user_id:'',
					comment:'',
					reference:''
				};


				$scope.init = function(){

					$scope.project_name = $state.params.project_name || '';
					$scope.getMotors();



				};


				$ionicModal.fromTemplateUrl('js/views/motors/create/motor.mdl.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					$scope.modalMotor = modal;
				});


				$scope.openModalMotor = function() {
					
					$scope.modalMotor.show();
					setTimeout(function () {
						$('#voltaje-id').addClass('active');
						$('#rated-power-label').addClass('active');
						$scope.motor.voltaje = 380;
					}, 1);
				};
				$scope.closeModalMotor = function() {
					$scope.modalMotor.hide();
				};
				// Cleanup the modal when we're done with it!
				$scope.$on('$destroy', function() {
					$scope.modalMotor.remove();
				});
				// Execute action on hide modal
				$scope.$on('modalMotor.hidden', function() {
					// Execute action
				});
				// Execute action on remove modal
				$scope.$on('modalMotor.removed', function() {
					// Execute action
				});

				$scope.back = function(){
					$state.go('project');
				};

				$ionicPlatform.registerBackButtonAction(function () {
					$scope.back();
				}, 100);



				$scope.createMotor = function (){

					if($scope.motor.name === undefined || $scope.motor.name === '') {
						Utils.validateToast($scope.translations.MOTOR_COMPLETE_NAME);
						return;
					}

					if($scope.motor.voltaje === undefined || $scope.motor.voltaje === 0) {
						Utils.validateToast($scope.translations.MOTOR_COMPLETE_VOLT);
						return;
					}

					if($scope.motor.voltaje <= 0) {
						Utils.validateToast($scope.translations.MOTOR_COMPLETE_VOLTAJE_MINIMUN);
						// El voltaje debe ser mayor a 0
						return;
					}

					if($scope.motor.amp === undefined || $scope.motor.amp === 0) {
						Utils.validateToast($scope.translations.MOTOR_COMPLETE_AMP);
						return;
					}

					if($scope.motor.amp <= 0) {
						Utils.validateToast($scope.translations.MOTOR_COMPLETE_AMP_MINIMUN);
						// El amperaje debe ser mayor a 0
						return;
					}


					if($scope.motor.power_factor === undefined || $scope.motor.power_factor === 0) {
						Utils.validateToast($scope.translations.MOTOR_COMPLETE_FTP);
						return;
					}


					if($scope.motor.power_factor >= 10){
						$scope.motor.power_factor = ($scope.motor.power_factor /100);
					}else{
						$scope.motor.power_factor = ($scope.motor.power_factor /10);
					}

					if($scope.motor.power_factor > 1) {
						Utils.validateToast('Factor de potencia debe varia entre 0.0 y 1');
						return;
					}

					if($scope.motor.power_factor < 0) {
						Utils.validateToast('Factor de potencia debe varia entre 0.0 y 1');
						return;
					}




					if($scope.motor.rated_power === undefined || $scope.motor.rated_power === 0) {
						Utils.validateToast($scope.translations.MOTOR_COMPLETE_KW_EMPTY);
						// Los KW deben ser mayor a 0
						return;
					}

					if($scope.motor.rated_power <= 0) {
						Utils.validateToast($scope.translations.MOTOR_COMPLETE_KW_MINIMUN);
						// El amperaje debe ser mayor a 0
						return;
					}


					if($scope.motor.hours === undefined || $scope.motor.hours === 0) {
						Utils.validateToast($scope.translations.MOTOR_COMPLETE_HOURS_DAY);
						return;
					}

					if($scope.motor.days === undefined || $scope.motor.days === 0) {
						Utils.validateToast($scope.translations.MOTOR_COMPLETE_DAYS_MONTH);
						return;
					}

					if(StorageUserModel.getCurrentUser().type_user === 'explorer'){

						var motors = StorageMotor.getMotor();


						if(motors == undefined){
							motors = [];
						}


						var motor={
							name:$scope.motor.name,
							amp:$scope.motor.amp,
							volts:$scope.motor.voltaje,
							efficiency:$scope.motor.power_factor,
							rated_power:$scope.motor.rated_power,
							hours:$scope.motor.hours,
							days:$scope.motor.days,
						};

						motors.push(motor);
						StorageMotor.addMotor(motors);
						$scope.modalMotor.hide();

						$scope.getMotors();




					}else{

						$Motors.create($scope.user,$scope.motor,$state.params.id_quotation).then(function(_response){
							$scope.modalMotor.hide();
							Utils.validateToast($scope.translations.MOTOR_ADD_SUCCESS);
							console.log(_response);
							$scope.getMotors();
							$scope.motor ={};
						},function(_error){
							// Materialize.toast("Problemas al agregar motor",4000);
							// $scope.modalMotor.hide();
							$scope.motor ={};
							Utils.validateToast($scope.translations.MOTOR_ADD_FAIL);
							console.error(_error);
						});
					}
				};


				$scope.getMotors = function(){
					if(StorageUserModel.getCurrentUser().type_user === 'explorer'){
						$scope.motor =[];
						$scope.motors = StorageMotor.getMotor();



						if($scope.motors == undefined){
							$scope.motorButtonText=$scope.translations.BUTTON_ADD_MOTOR;
						}else{
							$scope.motorButtonText=$scope.translations.BUTTON_ADD_MORE_MOTORS;
						}
						$scope.$broadcast('scroll.refreshComplete');
					}else{
						$Motors.getByCalculation($state.params.id_quotation,StorageUserModel.getCurrentUser()).then(function(_response){
							$scope.motors = _response.data;
							$scope.$broadcast('scroll.refreshComplete');

							if($scope.motors == undefined){
								$scope.motorButtonText=$scope.translations.BUTTON_ADD_MOTOR;
							}else{
								$scope.motorButtonText=$scope.translations.BUTTON_ADD_MORE_MOTORS;
							}

						},function(_error){
							console.log(_error);
							$scope.$broadcast('scroll.refreshComplete');
						});
					}
				};

				$scope.doRefreshMotors = function(){
					$scope.getMotors();
				};

				$scope.goToQuotation= function(){
					if(StorageUserModel.getCurrentUser().type_user === 'explorer'){

						if(StorageMotor.getMotor() === undefined){
							Utils.validateToast($scope.translations.EMPTY_MOTORS_FINALIZE_QUOTATION);
						}else{
							$state.go('finalizeQuotation',{id_quotation: 0});
						}
					}else{
						if($scope.motors.length !== 0 ){
							$state.go('finalizeQuotation',{id_quotation: $state.params.id_quotation});
						}
					}
				};

				$scope.goToProjects= function(){
					$state.go('project');
				};
				$scope.goToProfile= function(){
					$state.go('settings');
				};
				$scope.goToQuotes= function(){

					$state.go('quotation');
				};

				$scope.goToDashboard= function(){
					$state.go('dashboard');
				};



			});
		}]);
}).call(this);
