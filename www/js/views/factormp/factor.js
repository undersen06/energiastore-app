'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('FactorController', ['$scope', '$state', '$ionicPlatform', '$cordovaCamera', '$FactorPenalty', 'StorageUserModel', '$resource', 'popUpService', '$cordovaStatusbar', 'Utils', '$cordovaActionSheet', '$ionicLoading', '$cordovaFileOpener2', '$cordovaFileTransfer', '$log', '$rootScope', '$filter', 'StorageCountryModel', '$Formulas',
		function ($scope, $state, $ionicPlatform, $cordovaCamera, $FactorPenalty, StorageUserModel, $resource, popUpService, $cordovaStatusbar, Utils, $cordovaActionSheet, $ionicLoading, $cordovaFileOpener2, $cordovaFileTransfer, $log, $rootScope, $filter, StorageCountryModel, $Formulas) {

			$ionicPlatform.ready(function () {
			
				$scope.options = {
					title: $rootScope.generic.SELECT_CAMERA_GALLERY,
					buttonLabels: [$rootScope.generic.SELECTED_CAMERA, $rootScope.generic.SELECT_GALLERY],
					addCancelButtonWithLabel: $rootScope.generic.CANCEL,
					androidEnableCancelButton: true,
					winphoneEnableCancelButton: true
				};

				$scope.values = [];
				$scope.curr = StorageCountryModel.getSelectedCurrency().symbol + '  ';

				$scope.removeValue = function (_index){
					_.remove($scope.values, function (n,index) {
						return _index == index;
					});
				};

				$scope.isIphoneX = function () {
					if (ionic.Platform.device().model != undefined) {
						if (ionic.Platform.device().model.startsWith('iPhone10')) {
							return true;
						}
					}
				};

				$scope.image = 'assets/img/photo.png';
				$scope.os = ionic.Platform.platform();
				$scope.user = StorageUserModel.getCurrentUser();
				$scope.register = {};
				$scope.user = StorageUserModel.getCurrentUser();
				$scope.factorType = {};

				$scope.back = function () {
					// TODO: ask if the user wanna leave
					$state.go('dashboard', {
						options: 'reload'
					}, {
						reload: true
					});
				};

				$scope.help = function () {
					$state.go('dashboard');
				};



				$scope.openCamera = function () {

					var options = {
						quality: 50,
						destinationType: Camera.DestinationType.DATA_URL,
						sourceType: Camera.PictureSourceType.CAMERA,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 200,
						targetHeight: 200,
						popoverOptions: CameraPopoverOptions,
						saveToPhotoAlbum: true,
						correctOrientation: true
					};

					$cordovaCamera.getPicture(options).then(function (_imageData) {
						$scope.factorType.photo = 'data:image/jpeg;base64,' + _imageData;
						$scope.image = $scope.factorType.photo;

					}, function (_error) {
						// Utils.validateToast('ERROR_CAMERA');
						$log.error(_error);


					});

				};

				$scope.openGallery = function () {

					var options = {
						quality: 50,
						destinationType: Camera.DestinationType.DATA_URL,
						sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 200,
						targetHeight: 200,
						popoverOptions: CameraPopoverOptions,
					};

					$cordovaCamera.getPicture(options).then(function (_imageData) {
						$scope.factorType.photo = 'data:image/jpeg;base64,' + _imageData;
						$scope.image = $scope.factorType.photo;
					}, function (_err) {

						// Utils.validateToast('ERROR_GALLERY');
						$log.error(_err);

					});
				};


				$scope.createFactorPenalty = function () {
					if ($scope.values.lenght === 0) {
						Utils.validateToast('QUOTATION_AMOUNT_EMPTY');
						return;
					}

					var aux = 0;
					$scope.values.forEach(element => {
						aux = element + aux;
					});


					if ($scope.factorType.power_factor < 100) {
						Utils.validateToast('QUOTATION_AMOUNT_MINIMUM');
						return;
					}

					var calculation = $scope.factorType;

					calculation.power_factor = (aux / $scope.values.length);

					$ionicLoading.show({
						templateUrl: 'loading.html'
					}).then(function () {
						$scope.CreateQuoate(calculation);
					});
				};




				$scope.CreateQuoate = function (calculation) {

					$FactorPenalty.create(calculation, $scope.user).then(function (_response) {

						$scope.getPDF(_response.data.calculation, _response.data.id);
						$log.info(_response);
					}, function (_error) {

						$log.error(_error);
						$ionicLoading.hide();
						popUpService.showPopUpFailCreateFactor($scope.translations).then(function () {
							$state.go('dashboard', {}, {reload: true});
						});
					});
				};




				$scope.showPopUpImage = function () {
					$cordovaActionSheet.show($scope.options).then(function (btnIndex) {
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


				$ionicPlatform.registerBackButtonAction(function () {
					// $state.go("dashboard");
					$state.go('dashboard', {}, {
						reload: true,
						inherit: false,
						notify: true
					});
				}, 100);


				$scope.getPDF = function (param1, _quotation_id) {
					$scope.downloadFile(`http://energiastoreapp.com/api/calculations/${param1}/quotations/${_quotation_id}/pdf`);
				};


				$scope.downloadFile = function (_url) {

					var targetPath = cordova.file.dataDirectory;
					var trustHosts = true;
					var params = {};
					params.headers = {
						token: StorageUserModel.getCurrentUser().authentication_token,
						username: StorageUserModel.getCurrentUser().username
					};

					$cordovaFileTransfer.download(_url, targetPath + 'pdf.pdf', params, trustHosts).then(
						function (result) {
							$ionicLoading.hide();
							$log.info(result);

							$scope.openFile(targetPath + 'pdf.pdf');


						},
						function (_error) {
							// $scope.openFile(_file_name);
							$log.error(_error);
							// Error
						},
						function () {}
					);
				};


				$scope.openFile = function (_path_file) {

					$cordovaFileOpener2
						.open(_path_file, 'application/pdf').then(
							function (_response) {
								$log.info(_response);

								setTimeout(function () {

									$state.go('dashboard');
								}, 1000);

							},
							function (_error) {
								$log.error(_error);
								popUpService.fail_open_pdf();
								// An error occurred. Show a message to the user
							}
						);
				};


				$scope.addValue = function () {

					if ($scope.factorType.power_factor_1 === undefined || $scope.factorType.power_factor_1 === 0) {
						Utils.validateToast('QUOTATION_AMOUNT_EMPTY');
						return;
					}

					if ($scope.factorType.power_factor_1 <= $scope.minValue){
						Utils.validateToast('QUOTATION_AMOUNT_EMPTY');
						return;
					}

					$scope.values.push($scope.factorType.power_factor_1);
					$scope.factorType.power_factor_1 ='';

				};

				$scope.getMinValues = function () {
					$Formulas.getFormulas().then(function (_data) {
						//Parse by country

						var aux = _.find(_data.data, {
							'country_id': StorageCountryModel.getSelectedCountry().id,
							'name': 'ROI',
						});

						aux = aux.object;

						var numb = aux.ranges[0].statement.match(/\d/g);
						numb = numb.join('');
						$scope.minValue = numb; 

					}, function (_error) {
						$log.error(_error);

					});
				};

				$scope.getMinValues();


			});
		}
	]);
}).call(this);