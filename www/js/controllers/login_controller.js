"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("LoginController", ["$scope", "$state","$ionicPlatform","StorageUserModel","Session","translationService","$resource","$cordovaStatusbar","$ionicLoading","Utils",
  function($scope, $state,$ionicPlatform,StorageUserModel,Session,translationService,$resource,$cordovaStatusbar,$ionicLoading,Utils) {

    $scope.design = {};
    switch (StorageUserModel.getCurrentUser().type_user) {
      case 'user':
      $scope.design.header = 'user-color'
      $scope.design.color = 'user-color-font'
      break;

      case 'partner':
      $scope.design.header = 'partner-color'
      $scope.design.color = 'partner-color-font'
      break;

      case 'explorer':
      $scope.design.header = 'explorer-color'
      $scope.design.color = 'explorer-color-font'
      break;
      default:
      $scope.design.header = 'user-color'
      $scope.design.color = 'user-color-font'
      break;
    }
    $ionicPlatform.ready(function() {

      if (window.StatusBar) {
        $cordovaStatusbar.overlaysWebView(false);
        $cordovaStatusbar.style(1);
        switch (StorageUserModel.getCurrentUser().type_user) {
          case 'explorer':
          $cordovaStatusbar.styleHex("#62BED4");
          break;
          case 'user':
          $cordovaStatusbar.styleHex("#62D485");
          break;

          case 'partner':
          $cordovaStatusbar.styleHex("#F5A623");
          break;
          default:

        }
        $cordovaStatusbar.show();
      }

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
        });

        $scope.user ={};

      $scope.goToRegister = function(){
        $state.go("register");
      };


      $scope.login= function (){
        if($scope.user.email === undefined || $scope.user.email === ""){
          Utils.validateToast($scope.translations.LOGIN_EMAIL_EMPTY_ERROR);
          return;
        }

        if($scope.user.password === undefined || $scope.user.password === ""){
          Utils.validateToast($scope.translations.LOGIN_PASSWORD_EMPTY_ERROR);
          return;
        }

        $ionicLoading.show({
          templateUrl:"loading.html"
          // template: `${$scope.translations.LOADING}...`
        });

        Session.login($scope.user).then(function(_response){
          StorageUserModel.setCurrentUser(_response.data);
          $state.go("dashboard");
          console.log(_response);
          $ionicLoading.hide();
        },function(_error){
          Materialize.toast($scope.translations.LOGIN_ERROR,4000);
          console.error(_error);
          $ionicLoading.hide();
        })
      };

      $ionicPlatform.registerBackButtonAction(function () {
          $state.Back();
      }, 100);

      $scope.Back = function(){
        $state.go('middleware')
      }

      // $scope.goExplorer = function(){
      //
      //
      //
      //   $state.go("dashboard");
      // }


    });
  }]);
}).call(this);
