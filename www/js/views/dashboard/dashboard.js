"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("DashboardController", ["$scope", "$state","$ionicPlatform","StorageUserModel","translationService","$resource","$cordovaStatusbar","User",
  function($scope, $state,$ionicPlatform,StorageUserModel,translationService,$resource,$cordovaStatusbar,User) {

    $scope.design = {};
    switch (StorageUserModel.getCurrentUser().type_user) {
      case 'user':

      $scope.design.header = 'user-color'
      $scope.design.footer = 'user-color'
      break;

      case 'partner':
      $scope.design.header = 'partner-color'
      $scope.design.footer = 'partner-color'
      break;

      case 'explorer':
      $scope.design.header = 'explorer-color'
      $scope.design.footer = 'explorer-color'
      break;
      default:
      $scope.design.header = 'user-color'
      $scope.design.footer = 'user-color'
      break;
    }
    const languageFilePath = translationService.getTranslation();
    $resource(languageFilePath).get(function (data) {
      $scope.translations = data;
    });

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

      var user = StorageUserModel.getCurrentUser();
      $scope.register = {};
      $scope.user = StorageUserModel.getCurrentUser();


        $scope.goToPenaltyEnergyEffiency = function(){
          $state.go("factor");
        };

        $scope.goToSettings = function(){
          $state.go("settings");
        };

        $scope.goToProjects =  function(){
          $state.go("project");
        }

        $ionicPlatform.registerBackButtonAction(function () {
          ionic.Platform.exitApp();
        }, 100);


      });
    }]);
  }).call(this);
