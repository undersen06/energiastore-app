"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("WelcomeController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","$timeout","StorageUserModel","StorageLanguageModel",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,StorageUserModel,StorageLanguageModel) {
    $ionicPlatform.ready(function() {



      $scope.chooseLanguage = function(_language){
        StorageLanguageModel.setCurrentLanguage(_language);
        $resource(translationService.getTranslation()).get(function (data) {
            $scope.translations = data;
            $ionicSlideBoxDelegate.slide(1);
        });

        $ionicSlideBoxDelegate.enableSlide(false);

      }
      $scope.chooseCountry = function(country){
        $state.go('introduction')
      }

      $scope.stop = function () {
        $ionicSlideBoxDelegate.enableSlide(false);
      };



    });
  }]);
}).call(this);
