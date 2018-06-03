'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function () {
	this.app.controller('NewsController', ['$scope', '$state', '$ionicPlatform', '$News', '$log',
		function ($scope, $state, $ionicPlatform, $News, $log) {
			$ionicPlatform.ready(function () {

				$scope.query = {};
				$scope.queryBy = '$';


				$scope.init = function () {
					$News.getNews().then(function (_response) {
						$scope.news = _response.data;
						
					}, function (_error) {
						//TODO show error
						$log.error(_error);
                        
					});
				};


				$scope.init();

				$scope.goBack =  function(){
					$state.go('dashboard');
				};	
			});
		}
	]);
}).call(this);