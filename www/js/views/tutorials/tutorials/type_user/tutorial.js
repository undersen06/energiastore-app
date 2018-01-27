"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("TutorialTypeUserController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","$timeout","$ionicPopup",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,$ionicPopup) {

    const languageFilePath = translationService.getTranslation();
    $resource(languageFilePath).get(function (data) {
      $scope.translations = data;
      $scope.RightButtonText = $scope.translations.NEXT;
      $scope.LeftButtonText =  $scope.translations.BACK;
      $scope.SkipButton = $scope.translations.SKIP;
    });


    $ionicPlatform.ready(function() {




      const containerId = $('#content-id');
      // const worldId = $('#world-animate');
      // const notification_1 = $('#notification-id-1');
      // const notification_2 = $('#notification-id-2');
      // var  hasChangeSlide3 = false;


      $scope.shouldShowBackButton=false;



      $scope.init = function(){
        if($state.params.flag == 'config'){}else{
          var myPopup = $ionicPopup.show({
            animation: 'fade-in',
            title: '<img src="./img/common/stars.png">',
            subTitle: `<span class="popup-title">${$scope.translations.TUTORIAL_WELCOME_TITLE}</span>`,
            template: `<p class="popup-subtitle">${$scope.translations.TUTORIAL_WELCOME_TEXT}</p>`,
            scope: $scope,
            buttons: [
              { text: `${$scope.translations.QUOTATION_POPUP_CANCEL_BUTTON}`,
              type: 'button-cancel'
            },
            {
              text: `${$scope.translations.MODAL_CREATE_FACTOR_BUTTON}`,
              type: 'button-afirmative',
              onTap: function(e) {

              }
            }
          ]
        });
      }
    }


    $scope.finish = function(){


      if($state.params.flag == 'config'){
        $state.go('tutorials')
      }else{

        var myPopup = $ionicPopup.show({
          animation: 'fade-in',
          title: '<img src="./img/common/flying_email.png">',
          subTitle: `<span class="popup-title">${$scope.translations.TUTORIAL_TYPE_USER_TITLE}</span>`,
          template: `<p class="popup-subtitle">${$scope.translations.TUTORIAL_TYPE_USER_TEXT}</p>`,
          scope: $scope,
          buttons: [
            {
              text: `${$scope.translations.MODAL_CREATE_FACTOR_BUTTON}`,
              type: 'button-afirmative',
              onTap: function(e) {


                if($state.params.flag == 'config'){
                  $state.go('tutorials');
                }else{
                $state.go('middleware');
                }
              }
            }
          ]
        });
      }
    }




    $scope.slideHasChanged = function(_index){

      switch (_index) {
        case 0:
        containerId.addClass('slider-one');
        containerId.removeClass('slider-two');
        $scope.shouldShowBackButton=false;
        break;
        case 1:
        containerId.addClass('slider-two');
        containerId.removeClass('slider-three');
        $scope.shouldShowBackButton=true;
        $scope.RightButtonText = $scope.translations.NEXT;
        break;
        case 2:
        containerId.addClass('slider-three');
        containerId.removeClass('slider-two');
        $scope.RightButtonText = $scope.translations.SKIP;



        break;
        default:

      }
    };


    $scope.goBack = function(){
      $ionicSlideBoxDelegate.previous();
    }

    $scope.goAhead = function(){
      if(($ionicSlideBoxDelegate.currentIndex()+1) === $ionicSlideBoxDelegate.slidesCount()){
        $scope.finish();
      }else{
        $ionicSlideBoxDelegate.next();
      }
    }


  });
}]);
}).call(this);
