'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('FinalizedQuotationController', ['$scope', '$state','$ionicPlatform','StorageUserModel','translationService','$resource','$cordovaStatusbar','$ionicLoading','Utils','Quotation','$cordovaActionSheet','$cordovaCamera','PDF','$cordovaFileTransfer','$cordovaFileOpener2','$timeout','$ionicModal','popUpService','$ionicSlideBoxDelegate','Calculation','User','Motors','StorageProject','StorageMotor',
		function($scope, $state,$ionicPlatform,StorageUserModel,translationService,$resource,$cordovaStatusbar,$ionicLoading,Utils,Quotation,$cordovaActionSheet,$cordovaCamera,PDF,$cordovaFileTransfer,$cordovaFileOpener2,$timeout,$ionicModal,popUpService,$ionicSlideBoxDelegate,Calculation,User,Motors,StorageProject,StorageMotor) {


			$ionicPlatform.ready(function() {

				const languageFilePath = translationService.getTranslation();
				$resource(languageFilePath).get(function (data) {
					$scope.translations = data;
					$scope.options = { title: $scope.translations.ACTION_SHEET_PHOTO_TITLE, buttonLabels: [$scope.translations.ACTION_SHEET_PHOTO_CAMERA, $scope.translations.ACTION_SHEET_PHOTO_GALERY], addCancelButtonWithLabel: $scope.translations.CHOOSE_LANGUAGE_CANCEL, androidEnableCancelButton: true, winphoneEnableCancelButton: true };
				});

			


				$scope.image = 'assets/img/photo.png';
				var user = StorageUserModel.getCurrentUser();
				$scope.user = StorageUserModel.getCurrentUser();
				$scope.register = {};
				$scope.quote={};
				$scope.project ={};
				var added_motors=0;


				$scope.FinishQuotation = function(){

					if(user.type_user === 'explorer'){

						popUpService.showPopUpRegister($scope.translations).then(function(_response){
							if(!_response){
								$scope.showModalRegister();

							}

						});

					}else{

						var quote={
							calculation_id:$state.params.id_quotation,
							user_id:user.id,
							comment:$scope.quote.comments,
							reference:$scope.quote.photo
						};

						$ionicLoading.show({
							templateUrl:'loading.html'
						}).then(function () {


							Quotation.Create(user, quote).then(function(_response) {
								$scope.getPDF($state.params.id_quotation,_response.data.id);
							}, function(_error) {

							});
						});
					}
				};



				$scope.showModalRegister = function(){
					$scope.openModalMotor();
				};


				$scope.persistProject= function(){

					var project={
						price:StorageProject.getProjects().energy_cost,
						name:StorageProject.getProjects().name,
					};

					Calculation.create(project, StorageUserModel.getCurrentUser()).then(
						function(_response) {
							Utils.validateToast($scope.translations.QUOTATION_CREATED_MESSAGE);
							// $scope.calculations = {};
							// $scope.getCalculation();
							// console.log(_response);

							$scope.project = _response.data;

							$scope.persistMotor();
						},
						function(_error) {
							Utils.validateToast($scope.translations.QUOTATION_FAIL_MESSAGE);
							console.log(_error);
						}
					);

				};

				$scope.persistMotor=function(){

					var motors = StorageMotor.getMotor();


					for (var i = 0; i < motors.length; i++) {



						motors[i].hours = motors[i].average_time;
						motors[i].power_factor = motors[i].efficiency;
						motors[i].voltaje = motors[i].volts;

						Motors.create(StorageUserModel.getCurrentUser(),motors[i],$scope.project.id).then(function(_response){
							added_motors++;
							if(added_motors === motors.length){

								$scope.persisteQuoate();
							}
						},function(_error){
							// Materialize.toast("Problemas al agregar motor",4000);
							// $scope.modalMotor.hide();
							Utils.validateToast($scope.translations.MOTOR_ADD_FAIL);
							console.error(_error);
						});

					}




				};

				$scope.persisteQuoate = function(){

					var quote={
						calculation_id:$scope.project.id,
						user_id:StorageUserModel.getCurrentUser().id,
						comment:$scope.quote.comments,
						reference:$scope.quote.photo
					};

					$ionicLoading.show({
						templateUrl:'loading.html'
					}).then(function () {


						Quotation.Create(StorageUserModel.getCurrentUser(), quote).then(function(_response) {
							$scope.getPDF($scope.project.id,_response.data.id);
						}, function(_error) {

						});
					});
				};


				$ionicModal.fromTemplateUrl('modal-register', {
					scope: $scope,
					animation: 'slide-in-up'

				}).then(function(modal) {
					$scope.modalMotor = modal;
					$scope.modalMotor.hardwareBackButtonClose = false;
				});


				$scope.openModalMotor = function() {
					
					$scope.modalMotor.show();
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
					$state.go('motors',{id_quotation: $state.params.id_quotation});
				};


				$ionicPlatform.registerBackButtonAction(function () {
					$scope.back();
				}, 100);


				$scope.validateQuotation =  function (){
					$scope.FinishQuotation();
				};

				$scope.getPDF = function(param1,_quotation_id){
					// PDF.getPDF(user,$state.params.id_quotation,_quotation_id).then(function(_response){
					//
					//
					// },function(_error){
					//
					// })

					var url = `http://kvar.herokuapp.com/api/calculations/${param1}/quotations/${_quotation_id}/pdf`;

					$scope.downloadFile(url);




				};


				$scope.downloadFile = function(_url, _file_name) {

					var targetPath = this.cordova.file.dataDirectory;
					var trustHosts = true;
					var params= {};
					params.headers={
						token: StorageUserModel.getCurrentUser().authentication_token,
						username: StorageUserModel.getCurrentUser().username
					};


					

					$cordovaFileTransfer.download(_url, targetPath+'pdf.pdf', params, trustHosts).then(
						function(result) {
							$ionicLoading.hide();
							console.log(result);
							$scope.openFile(targetPath+'pdf.pdf');


						},
						function(err) {

							// $scope.openFile(_file_name);
							console.log(err);
							// Error
						},
						function(progress) {
							// Materialize.toast("Descargando PDF",4000);
							$timeout(function() {
								$scope.downloadProgress =
              progress.loaded / progress.total * 100;
								if ($scope.downloadProgress === 100) {
									$('#btn-play-pdf').removeClass('disabled');
								}
							});
						}
					);
				};


				$scope.openFile = function(_path_file) {
					// // let path = targetPath +'/'+ _file_name;
					// var path = targetPath + _file_name;
					// console.log(path);

					$cordovaFileOpener2
						.open(_path_file, 'application/pdf').then(
							function(_response) {
								console.log(_response);

								setTimeout(function () {

									$state.go('project');
								}, 1000);

							},
							function(err) {
								console.error(err);

								// An error occurred. Show a message to the user
							}
						);
				};


				$scope.openCamera = function (){

					let options = {
						quality: 50,
						destinationType: Camera.DestinationType.DATA_URL,
						sourceType: Camera.PictureSourceType.CAMERA,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 200,
						targetHeight: 200,
						popoverOptions: CameraPopoverOptions,
						saveToPhotoAlbum: true,
						correctOrientation:true
					};

					$cordovaCamera.getPicture(options).then(function(_imageData) {
						$scope.quote.photo = 'data:image/jpeg;base64,' + _imageData;
						$scope.image = $scope.quote.photo;
					}, function(_err) {
						Utils.validateToast($scope.ERROR_CAMERA);
						console.log(_err);
					});

				};

				$scope.openGallery = function (){

					let options = {
						quality: 50,
						destinationType: Camera.DestinationType.DATA_URL,
						sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 200,
						targetHeight: 200,
						popoverOptions: CameraPopoverOptions,
					};

					$cordovaCamera.getPicture(options).then(function(_imageData) {
						$scope.quote.photo = 'data:image/jpeg;base64,' + _imageData;
						$scope.image = $scope.quote.photo;
						// isPictureChanged=true;
					}, function(_err) {

						Utils.validateToast($scope.ERROR_GALLERY);
						console.error(_err);

					});
				};


				if (window.cordova){
					$scope.showPopUpImage = function(){
						$cordovaActionSheet
							.show($scope.options)
							.then(function(btnIndex) {

								switch (btnIndex) {
								case 1:
									$scope.openCamera();
									break;
								case 2:
									$scope.openGallery();
									break;
								default:
									break;
								}
							});
					};
				}





				$scope.validateSlider1 =function(){

					if ($scope.register.email === undefined || $scope.register.email === ''){
						Utils.validateToast($scope.translations.REGISTER_EMAIL_EMPTY_ERROR);
						return;
					}

					if ($scope.register.password === undefined || $scope.register.password === ''){
						Utils.validateToast($scope.translations.REGISTER_PASSWORD_EMPTY_ERROR);
						return;
					}

					if ($scope.register.password_confirmation === undefined || $scope.register.password_confirmation === ''){
						Utils.validateToast($scope.translations.REGISTER_PASSWORD_CONFIRMATION_EMPTY_ERROR);
						return;
					}

					if ($scope.register.password_confirmation !== $scope.register.password){
						Utils.validateToast($scope.translations.REGISTER_PASSWORD_CONFIRMATION_UNMATCH_ERROR);
						return;
					}

					$scope.registerUser();

				};


				$scope.registerUser = function (){

					$ionicLoading.show({
						templateUrl:'loading.html'
					});
					User.registerUser($scope.register).then(function(_response){

						StorageUserModel.setCurrentUser(_response.data);

						setTimeout(function () {
							$ionicLoading.hide();

							$ionicSlideBoxDelegate.slide(1);
						}, 2000);

					},function(_error){

						$ionicLoading.hide();
						// Materialize.toast($scope.translations.REGISTER_SLIDER_1_ERROR,4000)
						console.error(_error);

					});
				};
				$scope.finish= function(){
					$scope.closeModalMotor();
					$ionicLoading.show({
						template: `${$scope.translations.LOADING}...`
					});
					$scope.persistProject();

				};
				$scope.disableSwipe = function() {
					$ionicSlideBoxDelegate.enableSlide(false);
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

				$scope.Close = function(){
					$scope.closeModalMotor();
				};



			});
		}]);
}).call(this);
