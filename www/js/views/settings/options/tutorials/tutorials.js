'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('TutorialsController', ['$scope', '$state','$ionicPlatform','popUpService',
		function($scope, $state,$ionicPlatform,popUpService) {
			$ionicPlatform.ready(function() {
		
				$scope.chooseTutorial = function (_index){

					switch (_index) {
					case 1:
						$state.go('tutorialTypeUser',{flag:'config'});
						break;
					case 2 :
						$state.go('tutorialFactor',{flag:'config'});
						break;
					default:
						// $scope.popUpNotTutorial();
						//TODO: Replace to workingOnPopup
						popUpService.workingOnPopUp();
						break;

					}
				};


				$scope.goBack = function(){
					$state.go('settings');
				};


			});
		}]);
}).call(this);
