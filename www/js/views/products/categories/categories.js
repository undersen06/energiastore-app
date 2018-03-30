'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('CategoriesController', ['$scope', '$state','$ionicPlatform','$resource','translationService','$cordovaStatusbar','$ionicSlideBoxDelegate','$timeout','StorageUserModel','StorageLanguageModel','$ionicPopup','$cordovaActionSheet','StorageStatus','StorageProject','StorageMotor','StorageQuotation','$ionicModal','User','$ionicLoading','popUpService','Woocommerce',
		function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,StorageUserModel,StorageLanguageModel,$ionicPopup,$cordovaActionSheet,StorageStatus,StorageProject,StorageMotor,StorageQuotation,$ionicModal,User,$ionicLoading,popUpService,Woocommerce) {

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

			$ionicPlatform.ready(function() {



				var categories = [];
				var z = 1;
				var isFirstTime = true;

				downloadCategories(z);


				function downloadCategories(index) {

					Woocommerce.getAllCategories(index).then(function(_response){
						if(isFirstTime){
							categories = _response;
							isFirstTime = false;

							downloadCategories(z = z+ 1);
						}else{
							if(_response.length == 10){
								for (var i = 0; i < _response.length; i++) {
									categories.push(_response[i]);
								}
								downloadCategories(z = z+ 1);
							}else{
								for (var i = 0; i < _response.length; i++) {
									categories.push(_response[i]);
								}
								$scope.categories = categories;
							}
						}


						
					},function(_error){
						
					});

				}


				$scope.goToProductsByCategory = function(_index){
					$state.go('products',{category_id:_index});
				};



			});
		}]);
}).call(this);
