"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("ProfileController", ["$scope", "$state","$ionicPlatform","$rootScope","Session","StorageUserModel","User","$resource","translationService","popUpService","$cordovaStatusbar","Utils",
  function($scope, $state,$ionicPlatform,$rootScope,Session,StorageUserModel,User,$resource,translationService,popUpService,$cordovaStatusbar,Utils) {

    $scope.design = {};
    switch (StorageUserModel.getCurrentUser().type_user) {
      case 'user':

      $scope.design.header = 'user-color'
      $scope.design.footer = 'user-color'
      $scope.design.button = 'user-color-button'
      break;

      case 'partner':
      $scope.design.header = 'partner-color'
      $scope.design.footer = 'partner-color'
      $scope.design.button = 'partner-color-button'
      break;

      case 'explorer':
      $scope.design.header = 'explorer-color'
      $scope.design.footer = 'explorer-color'
      $scope.design.button = 'explorer-color-button'
      break;
      default:
      $scope.design.header = 'user-color'
      $scope.design.footer = 'user-color'
      $scope.design.button = 'user-color-button'
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


      $scope.placeholder = {};
      $scope.user = {};

      $scope.init = function(){


        let user  = StorageUserModel.getCurrentUser();


        $scope.placeholder.name = "Nombre";
        $scope.placeholder.last_name = "Apellido";
        $scope.placeholder.phone = "Telefono";
        $scope.placeholder.address = "Direccion";

        if(user.name!== undefined){$scope.placeholder.name = user.name;}
        if(user.last_name!== undefined){$scope.placeholder.name = user.last_name;}
        if(user.phone!== undefined){$scope.placeholder.name = user.phone;}
        if(user.address!== undefined){$scope.placeholder.name = user.address;}

      };


      $scope.$on("$ionicView.beforeEnter", function(event) {
        let user = Object.assign({}, StorageUserModel.getCurrentUser());

        if (user.name !== undefined)
        $scope.placeholder.name = user.name;

        if (user.last_name !== undefined)
        $scope.placeholder.last_name = user.last_name;

        if (user.phone !== undefined)
        $scope.placeholder.phone = user.phone;

        if (user.address !== undefined)
        $scope.placeholder.address = user.address;

      });


      $scope.changeLanguage = function(){

      };

      $scope.backButton = function(){
        $state.go("settings");
      };

      $ionicPlatform.registerBackButtonAction(function () {
        $scope.backButton();
      }, 100);

      $scope.updateInfo = function(){

        if($scope.user.name === undefined || $scope.user.name  === ''){
          Materialize.toast("Complete nombre",4000);
          return;
        }

        if($scope.user.last_name === undefined || $scope.user.last_name  === ''){
          Materialize.toast("Complete apellido",4000);
          return;
        }
        if($scope.user.phone === undefined || $scope.user.phone  === ''){
          Materialize.toast("Complete telefono",4000);
          return;
        }
        if($scope.user.address === undefined || $scope.user.address  === ''){
          Materialize.toast("Complete dirección",4000);
          return;
        }



        User.updateUser(StorageUserModel.getCurrentUser(),$scope.user).then(function(_response){
          StorageUserModel.setCurrentUser(_response.data);
          popUpService.showpopUpProfileCreate($scope.translations).then(function(){
            $state.go("dashboard");
          });
          console.log(_response);
        },function(_error){
          popUpService.showpopUpProfileFail($scope.translations).then(function(){
            console.error(_error);
            $state.go("settings");
          });


        })



      };

      $scope.deleteData= function (){
        StorageUserModel.destroyCurrentUser();
        $state.go("login")
      };


      $scope.goToProjects= function(){
        $state.go('project');
      }
      $scope.goToProfile= function(){
        $state.go('settings');
      }
      $scope.goToQuotes= function(){
        $state.go('quotation');
      }

      $scope.goToDashboard= function(){
        $state.go('dashboard');
      }



    });
  }]);
}).call(this);
