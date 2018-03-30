'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('FactorController', ['$scope', '$state','$ionicPlatform','$cordovaCamera','FactorPenalty','StorageUserModel','translationService','$resource','popUpService','$cordovaStatusbar','Utils','$cordovaActionSheet','$ionicLoading','$cordovaFileOpener2','$cordovaFileTransfer' ,
		function($scope, $state,$ionicPlatform,$cordovaCamera,FactorPenalty,StorageUserModel,translationService,$resource,popUpService,$cordovaStatusbar,Utils,$cordovaActionSheet,$ionicLoading,$cordovaFileOpener2,$cordovaFileTransfer) {

			$scope.design = {};
			switch (StorageUserModel.getCurrentUser().type_user) {
			case 'user':

				$scope.design.header = 'user-color';
				$scope.design.footer = 'user-color';
				$scope.design.button = 'user-color-button';
				break;

			case 'partner':
				$scope.design.header = 'partner-color';
				$scope.design.footer = 'partner-color';
				$scope.design.button = 'partner-color-button';
				break;

			case 'explorer':
				$scope.design.header = 'explorer-color';
				$scope.design.footer = 'explorer-color';
				$scope.design.button = 'explorer-color-button';
				break;
			default:
				$scope.design.header = 'user-color';
				$scope.design.footer = 'user-color';
				$scope.design.button = 'user-color-button';
				break;
			}

			const languageFilePath = translationService.getTranslation();
			$resource(languageFilePath).get(function (data) {
				$scope.translations = data;
				$scope.options = { title: $scope.translations.ACTION_SHEET_PHOTO_TITLE, buttonLabels: [$scope.translations.ACTION_SHEET_PHOTO_CAMERA, $scope.translations.ACTION_SHEET_PHOTO_GALERY], addCancelButtonWithLabel: $scope.translations.CHOOSE_LANGUAGE_CANCEL, androidEnableCancelButton: true, winphoneEnableCancelButton: true };
			});


			$ionicPlatform.ready(function() {

				$scope.isIphoneX =  function(){
					if(this.ionic.Platform.device().model != undefined){
						if(this.ionic.Platform.device().model.startsWith('iPhone10')){
							return true;
						}
					}
				};

				$scope.image = 'assets/img/photo.png';
				$scope.os = this.ionic.Platform.platform();
				$scope.user = StorageUserModel.getCurrentUser();
				$scope.register={};
				$scope.user =  StorageUserModel.getCurrentUser();
				$scope.factorType={};

				// const _input_penalty = $('#input-penalty');
				// const _button_camera = $('#button-camera');
				// const _button_galley = $('#button-gallery');


				$scope.back = function(){
					$state.go('dashboard',{options:'reload'},{reload: true});
				};

				$scope.help = function(){
					$state.go('dashboard');
				};

				// $scope.doRefresh = function(){
				// 	Quotation.index($scope.user).then(function(_response){
				// 		for (var i = 0; i < array.length; i++) {
				// 			array[i];
				// 		}
				// 	},function(_error){


				// 	});
				// };

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
						$scope.factorType.photo = 'data:image/jpeg;base64,' + _imageData;
						$scope.image = $scope.factorType.photo;

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
						$scope.factorType.photo = 'data:image/jpeg;base64,' + _imageData;
						$scope.image = $scope.factorType.photo;
					}, function(_err) {

						Utils.validateToast($scope.ERROR_GALLERY);
						console.error(_err);

					});
				};


<<<<<<< HEAD
      $scope.createFactorPenalty =  function (){
        if($scope.factorType.power_factor_1 === undefined || $scope.factorType.power_factor_1 === 0){
          Utils.validateToast($scope.translations.QUOTATION_AMOUNT_EMPTY);
          return;
        }

        if ($scope.factorType.power_factor_2 === undefined || $scope.factorType.power_factor_2 === 0) {
          Utils.validateToast($scope.translations.QUOTATION_AMOUNT_EMPTY);
          return;
        }

        if ($scope.factorType.power_factor_3 === undefined || $scope.factorType.power_factor_3 === 0) {
          Utils.validateToast($scope.translations.QUOTATION_AMOUNT_EMPTY);
          return;
        }

        var total = $scope.factorType.power_factor_1 + $scope.factorType.power_factor_2 + $scope.factorType.power_factor_3;
        total = (total / 3 );

        if($scope.factorType.power_factor < 100 ){
          Utils.validateToast($scope.translations.QUOTATION_AMOUNT_MINIMUM);
          return;
        }
=======
				$scope.createFactorPenalty =  function (){
					if($scope.factorType.power_factor === undefined || $scope.factorType.power_factor === 0){
						Utils.validateToast($scope.translations.QUOTATION_AMOUNT_EMPTY);
						return;
					}

					if($scope.factorType.power_factor < 100 ){
						Utils.validateToast($scope.translations.QUOTATION_AMOUNT_MINIMUM);
						return;
					}
>>>>>>> 82f1d7d799c54f28680a349e15bb2efa645f6abc

					let calculation = $scope.factorType;

        calculation.power_factor = total;


					$ionicLoading.show({
						templateUrl:'loading.html'
					}).then(function () {


						$scope.CreateQuoate(calculation);
					});
				};




				$scope.CreateQuoate = function(calculation){

					FactorPenalty.create(calculation,$scope.user).then(function(_response){

						$scope.getPDF(_response.data.calculation,_response.data.id);
						// $ionicLoading.hide();
						console.log(_response);
					},function(_error){

						console.error(_error);
						$ionicLoading.hide();
						popUpService.showPopUpFailCreateFactor($scope.translations).then(function(){
							$state.go('dashboard',{},{reload:true});
						});
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

				$ionicPlatform.registerBackButtonAction(function () {
					// $state.go("dashboard");
					$state.go('dashboard',{},{reload: true, inherit: false, notify: true});
				}, 100);


				$scope.getPDF = function(param1,_quotation_id){
					$scope.downloadFile(`http://kvar.herokuapp.com/api/calculations/${param1}/quotations/${_quotation_id}/pdf`);
				};


				$scope.downloadFile = function(_url) {

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

					$cordovaFileOpener2
						.open(_path_file, 'application/pdf').then(
							function(_response) {
								console.log(_response);

								setTimeout(function () {

									$state.go('dashboard');
								}, 1000);

							},
							function(err) {
								console.error(err);

								// An error occurred. Show a message to the user
							}
						);
				};


			});
		}]);
}).call(this);
