"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("RegisterController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","User","$ionicLoading","StorageUserModel","$resource","translationService","$cordovaStatusbar","Utils","popUpService",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,User,$ionicLoading,StorageUserModel,$resource,translationService,$cordovaStatusbar,Utils,popUpService) {

    $ionicPlatform.ready(function() {

      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
        $scope.translations = data;
      });

      $scope.user={};

      $scope.goToRegister = function(){

        $state.go("register");

      };


      $scope.register= function (){

      };


      $scope.slideHasChanged= function(index){

        let _content_register = $("#content-register");

        switch (index) {
          case 0:

          _content_register.addClass("back-color1");
          _content_register.removeClass("back-color2");
          break;
          case 1:

          _content_register.removeClass("back-color3");
          _content_register.removeClass("back-color1");
          _content_register.addClass("back-color2");

          break;
          case 2:
          _content_register.removeClass("back-color2");
          _content_register.removeClass("back-color4");
          _content_register.addClass("back-color3");

          break;
          case 3:
          _content_register.addClass("welcome-background-4");
          _content_register.removeClass("welcome-background-3");
          break;

          default:

        }
      };

      $scope.nextButton = function(index){
        switch (index) {
          case 0:

          $scope.validateSlider1();

          // $ionicSlideBoxDelegate.slide(2)

          break;

          case 2:
          $scope.validateSlider1();


          break;

          case 3:
          $ionicSlideBoxDelegate.slide(1);

          break;
          default:

        }

      };


      $scope.validateSlider1 =function(){

        if ($scope.user.email === undefined || $scope.user.email === ''){
          Utils.validateToast($scope.translations.REGISTER_EMAIL_EMPTY_ERROR);
          return;
        }

        if ($scope.user.password === undefined || $scope.user.password === ''){
          Utils.validateToast($scope.translations.REGISTER_PASSWORD_EMPTY_ERROR);
          return;
        }

        if ($scope.user.password_confirmation === undefined || $scope.user.password_confirmation === ''){
          Utils.validateToast($scope.translations.REGISTER_PASSWORD_CONFIRMATION_EMPTY_ERROR);
          return;
        }

        if ($scope.user.password_confirmation !== $scope.user.password){
          Utils.validateToast($scope.translations.REGISTER_PASSWORD_CONFIRMATION_UNMATCH_ERROR);
          return;
        }

        $scope.registerUser();

      };


      $scope.registerUser = function (){

        $ionicLoading.show({
          templateUrl:"loading.html",
        });
        User.registerUser($scope.user).then(function(_response){

          StorageUserModel.setCurrentUser(_response.data);

          setTimeout(function () {
            $ionicLoading.hide();

            $ionicSlideBoxDelegate.slide(1)
          }, 2000);

        },function(_error){

          $ionicLoading.hide();
          // Materialize.toast($scope.translations.REGISTER_SLIDER_1_ERROR,4000)
          console.error(_error)

        })
      };


      $scope.finish= function(){;
        $state.go("dashboard")
      };

      $ionicPlatform.registerBackButtonAction(function () {
        $scope.onBack();
      }, 100);

      $scope.disableSwipe = function() {
        $ionicSlideBoxDelegate.enableSlide(false);
      };


      $scope.onBack = function (){
        if ($ionicSlideBoxDelegate.currentIndex() === 0 ){

          popUpService.showPopupLeaveRegister($scope.translations).then(function(_response){
            if(_response === 2){
              $state.go("login")
            }
          });
        }
      }

    });


  }]);
}).call(this);
