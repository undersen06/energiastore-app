'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('ProductsController', ['$scope', '$state', '$ionicPlatform', '$Products','$log','$ionicHistory',
		function ($scope, $state, $ionicPlatform, $Products, $log,$ionicHistory) {



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

			$ionicPlatform.ready(function () {

				$scope.init =  function (){
					// $Products.getProductByCategory($state.params.category_id).then(function (_response){
					// 	// $scope.products = _response.data;
					// },function(_error){
						
					// 	$log.error(_error);
					// });
				};

				$scope.viewProduct = function (_id){
					$state.go('product',{category_id:$state.params.category_id,product_id:_id});
				};

				
				$scope.goBack = function () {
					var backView = $ionicHistory.backView();
					if (backView != undefined) {
						$state.go('dashboard');
					} else {
						backView.go();
					}
				};


			});
		}
	]);
}).call(this);