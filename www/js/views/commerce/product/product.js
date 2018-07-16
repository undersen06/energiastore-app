'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('ProductController', ['$scope', '$state', '$ionicPlatform', '$ionicHistory', '$Products', '$q', '$ionicSlideBoxDelegate', '$log', 'StorageCartModel', 'popUpService','Utils',
		function ($scope, $state, $ionicPlatform, $ionicHistory, $Products, $q, $ionicSlideBoxDelegate, $log, StorageCartModel, popUpService,Utils) {

			$ionicPlatform.ready(function () {

				$scope.queryBy = '$';
				$scope.isLoading = true;
				$scope.cartProduct = [];
				$scope.cartProduct = StorageCartModel.getCart();

				$scope.init = function () {

					window.screen.orientation.lock('portrait');
					window.screen.orientation.unlock();

					var promises = [];
					promises.push($Products.getProduct($state.params.product_id));
					promises.push($Products.getProductImages($state.params.product_id));
					promises.push($Products.getProductSheet($state.params.product_id));


					$q.all(promises).then(function (_response) {

						$scope.product = {};
						$scope.product.data = _response[0].data;
						$scope.product.images = _response[1].data;
						$scope.product.sheet = [];
						$scope.isLoading = false;

						Object.keys($scope.product.data.specs).forEach(function (key) {

							$scope.product.sheet.push({
								key: key,
								value: $scope.product.data.specs[key]
							});
						});
						$ionicSlideBoxDelegate.update();


					}, function (_error) {
						$log.error(_error);
						$scope.isLoading = false;
					});

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

				$scope.addCart = function (_product) {
					debugger;
					if (_.find(StorageCartModel.getCart(), { 'sku_name': _product.data.sku_name })) {
						Utils.validateToast('PRODUCT_ADD_CART');
					} else {
						StorageCartModel.addCart(_product.data);
					}

				};




				$scope.init();

			});
		}]);
}).call(this);
