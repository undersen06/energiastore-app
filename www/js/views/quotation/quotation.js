'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('QuotationController', ['$scope', '$state', '$ionicPlatform', '$Calculation', 'StorageUserModel', '$Motors', 'popUpService', '$Quotation', 'Utils', '$ionicSlideBoxDelegate', '$Factor', '$cordovaFileTransfer', '$cordovaFileOpener2', '$ionicLoading', 'httpUtilities', '$log',
		function ($scope, $state, $ionicPlatform, $Calculation, StorageUserModel, $Motors, popUpService, $Quotation, Utils, $ionicSlideBoxDelegate, $Factor, $cordovaFileTransfer, $cordovaFileOpener2, $ionicLoading, httpUtilities, $log) {
			

			$ionicPlatform.ready(function () {

				window.screen.orientation.lock('portrait');
				window.screen.orientation.unlock();

				$scope.calculations = [];
				$scope.platform = ionic.Platform.platform();

				$scope.right = function () {
					$('#tabulator').addClass('total-left');
					$ionicSlideBoxDelegate.slide(1);
				};

				$scope.left = function () {
					$('#tabulator').removeClass('total-left');
					$ionicSlideBoxDelegate.slide(0);
				};


				$scope.viewPdfProject = function (project_id) {
					$scope.getQuotations(project_id.id);
				};



				$scope.getFactors = function () {
					$Factor.getAllFactors(StorageUserModel.getCurrentUser()).then(function (_response) {
						$scope.factors = _response.data;
						
						$scope.$broadcast('scroll.refreshComplete');
					}, function (_error) {
						$log.error(_error);
					});
				};




				$scope.viewPdf = function (calculation) {
					$ionicLoading.show({
						templateUrl: 'loading.html'
					}).then(function () {
						var url = `http://energiastoreapp.com/api/calculations/${calculation.calculation_id}/quotations/${calculation.id}/pdf`;
						$scope.downloadFile(url);
					});
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
						function () {
							// Materialize.toast("Descargando PDF",4000);
							// $timeout(function() {
							//   $scope.downloadProgress =
							//   progress.loaded / progress.total * 100;
							//   if ($scope.downloadProgress === 100) {
							//     $("#btn-play-pdf").removeClass("disabled");
							//   }
							// });
						}
					);
				};


				$scope.openFile = function (_path_file) {
					// // var path = targetPath +'/'+ _file_name;
					// var path = targetPath + _file_name;
					

					$cordovaFileOpener2
						.open(_path_file, 'application/pdf').then(
							function (_response) {
								$log.info(_response);
								// $scope.closeModalQuote();
								// $state.go('factor',{},{reload:true})

							},
							function (_error) {
								$log.error(_error);
								popUpService.fail_open_pdf();
								// An error occurred. Show a message to the user
							}
						);
				};


				$scope.getCalculation = function () {
					$Calculation.getAll(StorageUserModel.getCurrentUser()).then(
						function (_response) {

							_response.data.forEach(element => {
								if(element.name != null){
									$scope.calculations.push(element);
								}
							});
							// $scope.calculations = _response.data;

							// $scope.getQuotations();
							//
							// $scope.calculations = _response.data;
							// $scope.$broadcast("scroll.refreshComplete");
							
							$ionicLoading.hide();
						},
						function (_error) {
							$ionicLoading.hide();
							httpUtilities.validateHTTPResponse(_error, popUpService, $scope.translations);

							// Utils.validateToast('QUOTATION_ERROR_DOWNLOAD_INFO');
							$scope.$broadcast('scroll.refreshComplete');
							$log.error(_error);

						}
					);
				};


				$scope.getQuotations = function (_calculation_id) {
					$Quotation.getAvailablePDFById(StorageUserModel.getCurrentUser(), _calculation_id).then(function (_response) {
						if (!_response.data.length == 0) {
							$scope.viewPdfProject_(_response.data[0]);
						}
					});
				};

				$scope.viewPdfProject_ = function (url) {
					$scope.downloadFile(`http://energiastoreapp.com${url.pdf_url}`);
				};

				$scope.goBack = function () {
					$state.go('dashboard');
				};


				$scope.goToProjects = function () {
					$state.go('project');

				};
				$scope.goToProfile = function () {
					$state.go('settings');

				};

				$scope.goToDashboard = function () {
					$state.go('dashboard');
				};

				$scope.getFactors();
				$scope.getCalculation();

			});
		}
	]);
}.call(this));
