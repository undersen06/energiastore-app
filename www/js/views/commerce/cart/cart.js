'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('CartController', ['$scope', '$state', '$ionicPlatform', '$log','$ionicHistory','StorageCartModel',
		function ($scope, $state, $ionicPlatform, $log,$ionicHistory,StorageCartModel) {

			$scope.queryBy = '$';
			$scope.isLoading = true;


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
					$log.info($scope.products) ;

					$scope.isLoading = false;
				};


				$scope.init();

				window.screen.orientation.lock('portrait');
				window.screen.orientation.unlock();

				$scope.goBack = function () {
					var backView = $ionicHistory.backView();
					
					if (backView == undefined) {
						$state.go('dashboard');
					} else {
						backView.go();
					}
				};

				$scope.delete = function (_product){
					StorageCartModel.removeFromCart(_product);
				};

			});
		}
	]);
}).call(this);