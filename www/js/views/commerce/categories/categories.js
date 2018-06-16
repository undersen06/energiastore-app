'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('CategoriesController', ['$scope', '$state', '$ionicPlatform', '$log', '$Products', '$ionicHistory',
		function ($scope, $state, $ionicPlatform, $log, $Products, $ionicHistory) {

			$scope.queryBy = '$'


			$scope.isIphoneX = function () {
				if (ionic.Platform.device().model != undefined) {
					if (ionic.Platform.device().model.startsWith('iPhone10')) {
						return true;
					}
				}
			};

			$ionicPlatform.ready(function () {

				$scope.init = function () {
					$Products.getCategories().then(function (_response) {
						$scope.categories = _response.data;
					}, function (_error) {
						$log.error(_error);

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