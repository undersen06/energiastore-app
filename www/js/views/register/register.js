'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
	this.app.controller('RegisterController', ['$scope', '$state','$ionicPlatform','$ionicSlideBoxDelegate','$User','$ionicLoading','StorageUserModel','$resource','translationService','Utils','popUpService','StorageCountryModel','$log',
		function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,$User,$ionicLoading,StorageUserModel,$resource,translationService,Utils,popUpService,StorageCountryModel,$log) {
			$ionicPlatform.ready(function() {

				$scope.user={};

				$scope.slideHasChanged= function(index){

					var _content_register = $('#content-register');

					switch (index) {
					case 0:
						_content_register.addClass('back-color1');
						_content_register.removeClass('back-color2');
						break;
					case 1:
						_content_register.removeClass('back-color3');
						_content_register.removeClass('back-color1');
						_content_register.addClass('back-color2');
						break;
					case 2:
						_content_register.removeClass('back-color2');
						_content_register.removeClass('back-color4');
						_content_register.addClass('back-color3');
						break;
					case 3:
						_content_register.addClass('welcome-background-4');
						_content_register.removeClass('welcome-background-3');
						break;
					}
				};

				$scope.nextButton = function(index){
					switch (index) {
					case 0:
						$scope.validateSlider1();
						break;
					case 2:
						$scope.validateSlider1();
						break;
					case 3:
						$ionicSlideBoxDelegate.slide(1);
						break;
					}
				};


				$scope.validateSlider1 =function(){

					if ($scope.user.email === undefined || $scope.user.email === ''){
						Utils.validateToast('REGISTER_EMAIL_EMPTY_ERROR');
						return;
					}

					if ($scope.user.password === undefined || $scope.user.password === ''){
						Utils.validateToast('REGISTER_PASSWORD_EMPTY_ERROR');
						return;
					}

					if ($scope.user.password_confirmation === undefined || $scope.user.password_confirmation === ''){
						Utils.validateToast('REGISTER_PASSWORD_CONFIRMATION_EMPTY_ERROR');
						return;
					}

					if ($scope.user.password_confirmation !== $scope.user.password){
						Utils.validateToast('REGISTER_PASSWORD_CONFIRMATION_UNMATCH_ERROR');
						return;
					}

					$scope.registerUser();

				};


				$scope.registerUser = function (){

					$ionicLoading.show({
						templateUrl:'loading.html',
					});
					$User.registerUser($scope.user).then(function(_response){

						StorageUserModel.setCurrentUser(_response.data);

						var country = StorageCountryModel.getSelectedCountry();
						$User.updateCountry(StorageUserModel.getCurrentUser(),country.name).then(function(_success){
							$log.info(_success);

						},function(_error){
							$log.error(_error);
							// TODO:
							//agregar mensaje en caso de que el usuario no pueda actualizar el país
							

						});

						setTimeout(function () {
							$ionicLoading.hide();

							$ionicSlideBoxDelegate.slide(1);
						}, 2000);

					},function(_error){
						$ionicLoading.hide();
						$log.error(_error);
						// TODO: 
						//agregar mensaje en caso de que el usuario no pueda ser creado

					});
				};


				$scope.finish= function(){
					$state.go('dashboard');
				};

				$ionicPlatform.registerBackButtonAction(function () {
					$scope.onBack();
				}, 100);

				$scope.disableSwipe = function() {
					$ionicSlideBoxDelegate.enableSlide(false);
				};


				$scope.onBack = function (){
					if ($ionicSlideBoxDelegate.currentIndex() === 0 ){
						popUpService.showPopupLeaveRegister().then(function(_response){
							_response === 2 ? $state.go('login') : '';
						});
					}
				};


			});


		}]);
}).call(this);
