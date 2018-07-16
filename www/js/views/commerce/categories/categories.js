'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('CategoriesController', ['$scope', '$state', '$ionicPlatform', '$log', '$Products', '$ionicHistory','StorageCartModel',
		function ($scope, $state, $ionicPlatform, $log, $Products, $ionicHistory,StorageCartModel) {

			$scope.queryBy = '$';
			$scope.isLoading =true;
			$scope.cartProduct = [];
			$scope.cartProduct = StorageCartModel.getCart();


			$scope.isIphoneX = function () {
				if (ionic.Platform.device().model != undefined) {
					if (ionic.Platform.device().model.startsWith('iPhone10')) {
						return true;
					}
				}
			};

			$ionicPlatform.ready(function () {

				window.screen.orientation.lock('portrait');
				window.screen.orientation.unlock();

				$scope.init = function () {
					$Products.getCategories().then(function (_response) {
						$scope.categories = _response.data;
						$scope.isLoading =false;
						
					}, function (_error) {
						$log.error(_error);
						$scope.isLoading =false;

					});
				};


				$scope.init();

				$scope.goBack = function () {
					var backView = $ionicHistory.backView();
					if (backView == undefined) {
						$state.go('dashboard');
					} else {
						backView.go();
					}
				};

				$scope.goToProductsByCategory = function (_id) {
					$state.go('products', { category_id: _id });
				};

				$scope.goToCart = function () {
					$state.go('cart');
				};

			});
		}
	]);
}).call(this);