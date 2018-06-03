'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('ProductsController', ['$scope', '$state', '$ionicPlatform', '$Products','$log',
		function ($scope, $state, $ionicPlatform, $Products, $log) {


			$ionicPlatform.ready(function () {

				$scope.init =  function (){
					$Products.getProductByCategory($state.params.id_category).then(function (_response){
						$scope.products = _response.data;
					},function(_error){
						$log.error(_error);
					});
				};



			});
		}
	]);
}).call(this);