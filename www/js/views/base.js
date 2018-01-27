"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("BaseController", ["$scope", "$state","$ionicPlatform","StorageUserModel","$resource","translationService","StorageLanguageModel","StorageStatus",
  function($scope, $state,$ionicPlatform,StorageUserModel,$resource,translationService,StorageLanguageModel,StorageStatus) {

    $ionicPlatform.ready(function() {



      if(StorageUserModel.getCurrentUser()){
        if(StorageUserModel.getCurrentUser().authentication_token === undefined){


          if(StorageStatus.getStatus() !== undefined){
            if(StorageStatus.getStatus().status == true){
              $state.go('dashboard');
            }else{
              if(StorageLanguageModel.getCurrentLanguage() === undefined){
                $state.go("welcome",{},{ reload: true })
              }else{
                $state.go("login",{},{ reload: true })
              }
            }
          }else{

          if(StorageLanguageModel.getCurrentLanguage() === undefined){
            $state.go("welcome",{},{ reload: true })
          }else{
            $state.go("login",{},{ reload: true })
          }

        }
        }else{

          if(StorageLanguageModel.getCurrentLanguage() === undefined){
            $state.go("welcome",{},{ reload: true })
          }else{
            $state.go("dashboard",{},{ reload: true })
          }
        }
      }else{

        if(StorageStatus.getStatus() !== undefined){
          if(StorageStatus.getStatus().status == true){
            $state.go('dashboard');
          }else{
            if(StorageLanguageModel.getCurrentLanguage() === undefined){
              $state.go("welcome",{},{ reload: true })
            }else{
              $state.go("login",{},{ reload: true })
            }
          }
        }else{
        if(StorageLanguageModel.getCurrentLanguage() === undefined){
          $state.go("welcome",{},{ reload: true })
        }else{
          $state.go("login",{},{ reload: true })
        }
      }

      }
    });
  }]);
}).call(this);
