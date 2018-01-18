"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("MiddlewareController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","$timeout","StorageUserModel","$ionicPopup",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,StorageUserModel,$ionicPopup) {




    if(StorageUserModel.getCurrentUser()){
      if(StorageUserModel.getCurrentUser().type_user === 'explorer'){
          $state.go('dashboard');
      }else if (StorageUserModel.getCurrentUser().authentication_token !== undefined){
          $state.go('dashboard');
      }
    }

    const languageFilePath = translationService.getTranslation();
    $resource(languageFilePath).get(function (data) {
      $scope.translations = data;
      
    });



    $ionicPlatform.ready(function() {





      $scope.handleGoTo = function(_index){

        switch (_index) {
          case 1:
          StorageUserModel.setCurrentUser({
            type_user:'user'
          });
          $state.go('login');
          break;

          case 2:

          $scope.workingOnPopUp();

          break;

          case 3:

          StorageUserModel.setCurrentUser({
            type_user:'explorer'
          });
          $state.go('dashboard');
          break;
          default:
          break;
        }
      }


      $scope.getHelp = function(){
        $state.go('tutorialTypeUser');
      }



      $scope.workingOnPopUp = function(){
        var myPopup = $ionicPopup.show({
          animation: 'fade-in',
          title: '<img src="./img/working-on.png" class="img-about-us">',
          subTitle: `<span class="popup-title">${$scope.translations.WORKING_ON_TITLE}</span>`,
          template: `<p class="popup-subtitle">${$scope.translations.WORKING_ON_TEXT}</p>`,
          scope: $scope,
          buttons: [
            {
              text: `${$scope.translations.WORKING_ON_BUTTON_TEXT}`,
              type: 'button-afirmative',
              onTap: function(e) {
                // $state.go('middleware')
              }
            }]
        });
      }


    });
  }]);
}).call(this);
