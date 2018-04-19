'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('ProductController', ['$scope', '$state','$ionicPlatform','$cordovaStatusbar','$ionicSlideBoxDelegate','$timeout','StorageUserModel','StorageLanguageModel','$ionicPopup','$cordovaActionSheet','StorageStatus','StorageProject','StorageMotor','StorageQuotation','$ionicModal','User','$ionicLoading','popUpService','Woocommerce',
		function($scope, $state,$ionicPlatform,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,StorageUserModel,StorageLanguageModel,$ionicPopup,$cordovaActionSheet,StorageStatus,StorageProject,StorageMotor,StorageQuotation,$ionicModal,User,$ionicLoading,popUpService,Woocommerce) {

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


				Woocommerce.getProductsByid($state.params.product_id).then(function(_response){
					$scope.product = _response;
					
				},function(_error){
					
				});





			});
		}]);
}).call(this);
