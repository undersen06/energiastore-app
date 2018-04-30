'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('ProductsController', ['$scope', '$state','$ionicPlatform','$timeout','StorageUserModel','$Woocommerce',
		function($scope, $state,$ionicPlatform,$timeout,StorageUserModel,$Woocommerce) {

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

				$Woocommerce.getProductsByCategory($state.params.category_id).then(function(_response){
					$scope.products = _response;
				},function(_error){
					
				});



				$scope.viewProduct = function(index_){
					$state.go('product',{
						category_id:$state.params.category_id,
						product_id:index_
					});

				};



			});
		}]);
}).call(this);
