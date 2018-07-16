'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('ProductsController', ['$scope', '$state', '$ionicPlatform', '$Products', '$log', '$ionicHistory', '$q', 'StorageCartModel',
		function ($scope, $state, $ionicPlatform, $Products, $log, $ionicHistory, $q, StorageCartModel) {
			$scope.products = [];
			$scope.isLoading = true;
			$scope.cartProduct = [];
			$scope.cartProduct = StorageCartModel.getCart();


			$ionicPlatform.ready(function () {


				$scope.init = function () {

					window.screen.orientation.lock('landscape');


					$Products.getProductByCategory($state.params.category_id).then(function (_response) {
						debugger;
						$scope.isLoading = false;
						// $scope.products = _response.data;

						// var promises =[];
						// _response.data.forEach(element => {
						// 	debugger;
						// 	promises.push($Products.getProductSheet($state.params.product_id));				
						// });


						// $q.all(promises).then(function(_response){

						// },function(_error){
						// 	$log.error(_error);
						// });

						if (_response.data.length != 0) {
							for (var i = 0; i < _response.data.length; i++) {
								var product = _response.data[i];



								if (typeof (product.specs) === 'string') {
									//parwse specs
									product.specs = JSON.parse(product.specs);
								}

								product.technical_info = [];
								Object.keys(product.specs).forEach(function (key) {
									product.technical_info.push({
										key: key,
										value: product.specs[key]
									});
								});
							}


							if (StorageCartModel.findProduct(product) == undefined) {
								product.isInTheCart = false;
							} else {
								product.isInTheCart = true;
							}

							$scope.products.push(product);
							$log.info($scope.products);

						}

					}, function (_error) {
						$log.error(_error);
						$scope.isLoading = false;
					});
				};

				// $scope.init =  function (){
				// 	$Products.getAllProducts().then(function (_response){
				// 		$scope.products = _response.data;
				// 	},function(_error){
				// 		$log.error(_error);
				// 	});
				// };

				$scope.viewProduct = function (_product) {
					$state.go('product', { category_id: $state.params.category_id, product_id: _product.id });
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
					StorageCartModel.addCart(_product);
				};

				$scope.interactCart = function ($event, _product) {

					if (_.find(StorageCartModel.getCart(), { 'sku_name': _product.sku_name })) {
						StorageCartModel.removeFromCart(_product);
						_product.isInTheCart = false;
					} else {
						StorageCartModel.addCart(_product);
						_product.isInTheCart = true;
					}
					$event.stopPropagation();

				};


				$scope.goToCart = function () {
					$state.go('cart');
				};


			});
		}
	]);
}).call(this);