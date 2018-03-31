'use strict';

(function() {
	this.app.component('footBar', {
		templateUrl: 'js/components/footbar/footbar.html',
		controller: function ($scope,$state,translationService,$resource,$ionicPlatform,$rootScope) {

			
			$scope.footbar = $rootScope.footbar;


			$scope.goToDashboard = function(){
				$state.go('dashboard');
			};

			$scope.goToProjects = function(){
				$state.go('project');
			};

			$scope.goToQuotes = function(){
				$state.go('quotation');
			};
			$ionicPlatform.ready(function() {
				if(ionic.Platform.device().model != undefined){
					if(ionic.Platform.device().model.startsWith('iPhone10')){
						$scope.isIphoneX = true;
					}
				}

			});

			console.log($rootScope);


		}
	});
}).call(this);
