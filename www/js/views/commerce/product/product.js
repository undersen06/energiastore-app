'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('ProductController', ['$scope', '$state', '$ionicPlatform','$ionicHistory',
		function ($scope, $state, $ionicPlatform,$ionicHistory) {

			$ionicPlatform.ready(function () {

				$scope.init = function () {

					$scope.product = {
						name: 'Bombillo #1',
						description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto',
						_id: '1',
						images: [
							{
								_id: '1',
								url: 'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
							},
							{
								_id: '2',
								url: 'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
							}
						],

					};

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
