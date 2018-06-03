'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('CategoriesController', ['$scope', '$state', '$ionicPlatform', '$log', '$Products',
		function ($scope, $state, $ionicPlatform, $log, $Products) {

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
					$state.go('dashboard');
				};

				$scope.goToProductsByCategory = function(_id){
					$state.go('products', { category_id:_id});
				};

			});
		}
	]);
}).call(this);