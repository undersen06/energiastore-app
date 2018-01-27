"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("TutorialPenaltyController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","$timeout","$ionicPopup","StorageLanguageModel",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,$ionicPopup,StorageLanguageModel) {
    $ionicPlatform.ready(function() {

      const containerId = $('#content-id');
      $scope.shouldShowBackButton=false;
      $scope.translations = {};

      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
        $scope.translations = data;
        $scope.RightButtonText = $scope.translations.NEXT;
        $scope.LeftButtonText =  $scope.translations.BACK;
        $scope.SkipButton = $scope.translations.SKIP;
      });




    //   $scope.init = function(){
    //     var myPopup = $ionicPopup.show({
    //       animation: 'fade-in',
    //       title: '<img src="./img/common/stars.png">',
    //       subTitle: '<span class="popup-title">Bienvenido</span>',
    //       template: '<p class="popup-subtitle">A continuacion te explicaremos los distintos perfiles que existen en energiaStore</p>',
    //       scope: $scope,
    //       buttons: [
    //         { text: 'Cancelar',
    //         type: 'button-cancel',
    //         onTap: function(e) {
    //           
    //           if($state.params.param === 'config'){
    //             $state.go('tutorials')
    //           }else{
    //             $state.go('middleware')
    //           }
    //           
    //         }
    //       },
    //       {
    //         text: 'Comenzar',
    //         type: 'button-afirmative',
    //         onTap: function(e) {
    //         }
    //       }
    //     ]
    //   });
    // }

  //
    $scope.finish = function(){

      $state.go('tutorials');
  }
  //



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

      break;
      case 2:
      containerId.addClass('slider-three');
      containerId.removeClass('slider-two');
      $scope.RightButtonText = 'Finalizar';


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
