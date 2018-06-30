'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('ProductsController', ['$scope', '$state', '$ionicPlatform', '$Products', '$log', '$ionicHistory','$q',
		function ($scope, $state, $ionicPlatform, $Products, $log, $ionicHistory,$q) {


			$scope.products = [];
			// $scope.products =[
			// 	{
			// 		name:'Bombillo #1',
			// 		description:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto',
			// 		_id:'1',
			// 		images:[
			// 			{
			// 				_id:'1',
			// 				url:'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
			// 			},
			// 			{
			// 				_id:'2',
			// 				url:'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
			// 			}
			// 		],

			// 	},

			// 	{
			// 		name:'Bombillo #2',
			// 		description:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto',
			// 		_id:'1',
			// 		images:[
			// 			{
			// 				_id:'1',
			// 				url:'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
			// 			},
			// 			{
			// 				_id:'2',
			// 				url:'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
			// 			}
			// 		],

			// 	},
			// 	{
			// 		name:'Bombillo #3',
			// 		description:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto',
			// 		_id:'1',
			// 		images:[
			// 			{
			// 				_id:'1',
			// 				url:'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
			// 			},
			// 			{
			// 				_id:'2',
			// 				url:'https://www.masterled.es/1365-thickbox_default/bombilla-led-3w-esfera-e14.jpg',
			// 			}
			// 		],

			// 	}


			// ];

			$ionicPlatform.ready(function () {

				// $state;
				// console.log($state);


				$scope.init = function () {


					$Products.getProductByCategory($state.params.category_id).then(function (_response) {
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
						
						
						for (var i = 0; i < _response.data.length; i++) {
							var product = _response.data[i];

							debugger;

							if(typeof(product.specs) === 'string'){
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

						$scope.products.push(product);
						$log.info($scope.products);		

					}, function (_error) {
						debugger;
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


			});
		}
	]);
}).call(this);