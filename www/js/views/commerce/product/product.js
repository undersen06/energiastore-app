'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('ProductController', ['$scope', '$state', '$ionicPlatform', '$ionicHistory', '$Products', '$q', '$ionicSlideBoxDelegate',
		function ($scope, $state, $ionicPlatform, $ionicHistory, $Products, $q, $ionicSlideBoxDelegate) {

			$ionicPlatform.ready(function () {

				$scope.init = function () {

					var promises = [];
					promises.push($Products.getProduct($state.params.product_id));
					promises.push($Products.getProductImages($state.params.product_id));
					promises.push($Products.getProductSheet($state.params.product_id));


					$q.all(promises).then(function (_response) {

						$scope.product = {};
						$scope.product.data = _response[0].data;
						$scope.product.images = _response[1].data;
						$scope.product.sheet = [];

						Object.keys($scope.product.data.specs).forEach(function (key) {

							$scope.product.sheet.push({
								key: key,
								value: $scope.product.data.specs[key]
							});
						});
						$ionicSlideBoxDelegate.update();
						debugger;

					}, function (_error) {
						$log.error(_error)
						debugger;
					})



					// $Products.getProduct($state.params.product_id).then(function (_response){
					// 	$scope.product = _response.data;
					// 	debugger;
					// },function(_error){

					// 	$log.error(_error);
					// });



				};

				$scope.options = {
					loop: true,
					effect: 'fade',
					speed: 1000,
				};


				// Woocommerce.getProductsByid($state.params.product_id).then(function(_response){
				// 	$scope.product = _response;

				// },function(_error){

				// });

				$scope.goToCart = function () {

					$state.go('cart');

				};

				$scope.goBack = function () {
					var backView = $ionicHistory.backView();
					if (backView == undefined) {
						$state.go('dashboard');
					} else {
						backView.go();
					}
				};


				$scope.init();

			});
		}]);
}).call(this);
