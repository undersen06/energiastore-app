"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("TutorialsController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","$timeout","StorageUserModel","StorageLanguageModel","$ionicPopup",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,StorageUserModel,StorageLanguageModel,$ionicPopup) {
    $ionicPlatform.ready(function() {

          const languageFilePath = translationService.getTranslation();
          $resource(languageFilePath).get(function (data) {
            $scope.translations = data;
            
          });




      $scope.chooseTutorial = function (_index){
        
        switch (_index) {
          case 1:
          $state.go('tutorialTypeUser',{flag:'config'})
          break;
          case 2 :
          $state.go('tutorialFactor',{flag:'config'})
          break;
          default:
            $scope.popUpNotTutorial();
          break;

        }
      }



      $scope.popUpNotTutorial = function(){

        var myPopup = $ionicPopup.show({
          animation: 'fade-in',
          title: '<img src="./img/working-on.png" class="img-about-us">',
          subTitle: `<span class="popup-title">${$scope.translations.WORKING_ON_TUTORIAL_TITLE}</span>`,
          template: `<p class="popup-subtitle">${$scope.translations.WORKING_ON_TUTORIAL_TEXT}</p>`,
          scope: $scope,
          buttons: [
          {
            text: `${$scope.translations.WORKING_ON_TUTORIAL_BUTTON_TEXT}`,
            type: 'button-afirmative',
            onTap: function(e) {
              // $state.go('middleware')
            }
          }
        ]
      });
    }


    $scope.goBack = function(){
      $state.go('settings');
    }


    });
  }]);
}).call(this);
