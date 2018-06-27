'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('CartController', ['$scope', '$state', '$ionicPlatform', '$log', '$Products','$ionicHistory','StorageCartModel',
		function ($scope, $state, $ionicPlatform, $log, $Products,$ionicHistory,StorageCartModel) {

            $scope.queryBy = '$';
            
            $scope.products =[
				{
					name:'Bombillo #1',
					description:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto',
					_id:'1',
					images:[
						{
							_id:'1',
							url:'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
						},
						{
							_id:'2',
							url:'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
						}
					],

				},

				{
					name:'Bombillo #2',
					description:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto',
					_id:'1',
					images:[
						{
							_id:'1',
							url:'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
						},
						{
							_id:'2',
							url:'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
						}
					],

				},
				{
					name:'Bombillo #3',
					description:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto',
					_id:'1',
					images:[
						{
							_id:'1',
							url:'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
						},
						{
							_id:'2',
							url:'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
						}
					],

				}


			];


			$scope.isIphoneX = function () {
				if (ionic.Platform.device().model != undefined) {
					if (ionic.Platform.device().model.startsWith('iPhone10')) {
						return true;
					}
				}
			};

			$ionicPlatform.ready(function () {

				$scope.init = function () {

					$scope.products = StorageCartModel.getCart();
					// $Products.getCategories().then(function (_response) {
					// 	$scope.categories = _response.data;
					// }, function (_error) {
					// 	$log.error(_error);

					// });
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

				$scope.goToProductsByCategory = function(_id){
					$state.go('products', { category_id:_id});
				};

			});
		}
	]);
}).call(this);