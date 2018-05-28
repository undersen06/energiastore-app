'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('RegisterController', ['$scope', '$state','$ionicPlatform','$ionicSlideBoxDelegate','$User','$ionicLoading','StorageUserModel','Utils','popUpService','StorageCountryModel','$log',
		function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,$User,$ionicLoading,StorageUserModel,Utils,popUpService,StorageCountryModel,$log) {
			$ionicPlatform.ready(function() {

				$scope.user={};

				$scope.registerUser = function (){

					if ($scope.user.email === undefined || $scope.user.email === '') {
						Utils.validateToast('REGISTER_EMAIL_EMPTY_ERROR');
						return;
					}

					if ($scope.user.password === undefined || $scope.user.password === '') {
						Utils.validateToast('REGISTER_PASSWORD_EMPTY_ERROR');
						return;
					}

					if ($scope.user.password_confirmation === undefined || $scope.user.password_confirmation === '') {
						Utils.validateToast('REGISTER_PASSWORD_CONFIRMATION_EMPTY_ERROR');
						return;
					}

					if ($scope.user.password_confirmation !== $scope.user.password) {
						Utils.validateToast('REGISTER_PASSWORD_CONFIRMATION_UNMATCH_ERROR');
						return;
					}

					$ionicLoading.show({
						templateUrl:'loading.html',
					});
					$User.registerUser($scope.user).then(function(_response){

						StorageUserModel.setCurrentUser(_response.data);

						var country = StorageCountryModel.getSelectedCountry();
						$User.updateCountry(StorageUserModel.getCurrentUser(),country.name).then(function(_success){
							$log.info(_success);
							$scope.finish();


						},function(_error){
							$log.error(_error);
							// TODO:
							//agregar mensaje en caso de que el usuario no pueda actualizar el país
						
						});
				

					},function(_error){
						$ionicLoading.hide();
						$log.error(_error);
						popUpService.fail_create_user();

					});
				};


				$scope.finish= function(){
					$ionicLoading.hide();
					$state.go('dashboard');
				};

				$ionicPlatform.registerBackButtonAction(function () {
					$scope.onBack();
				}, 100);


				$scope.onBack = function (){
					$state.go('login');
				};


			});


		}]);
}).call(this);
