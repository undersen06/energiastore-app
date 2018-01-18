"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("DashboardController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","Session","StorageUserModel","popUpService","translationService","$resource","$ionicPopover","$cordovaActionSheet","$cordovaStatusbar","StorageLanguageModel","$ionicPopup","IonicClosePopupService","StorageStatus","StorageProject","StorageMotor","StorageQuotation","User","$ionicModal","$ionicLoading",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,Session,StorageUserModel,popUpService,translationService,$resource,$ionicPopover,$cordovaActionSheet,$cordovaStatusbar,StorageLanguageModel,$ionicPopup,IonicClosePopupService,StorageStatus,StorageProject,StorageMotor,StorageQuotation,User,$ionicModal,$ionicLoading) {

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

    $ionicPlatform.ready(function() {


      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
        $scope.translations = data;
        $scope.init();
      });
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

      let user = StorageUserModel.getCurrentUser();
      $scope.register = {};
      $scope.user = StorageUserModel.getCurrentUser();

      $scope.init = function (){
        if(user.type_user === 'explorer'){
          if(StorageStatus.getStatus() === undefined){
            $scope.showPopUpExplorer();
          }
        }
      };


      $scope.showPopUpExplorer = function(){

        var myPopup = $ionicPopup.show({
          animation: 'fade-in',
          title: '<img src="./img/handOk.png" class="img-about-us">',
          subTitle: `<span class="popup-title">${$scope.translations.EXPLORER_TITLE}</span>`,
          template: `<p class="popup-subtitle">${$scope.translations.EXPLORER_TEXT}`,
          scope: $scope,
          buttons: [
            {
              text: `${$scope.translations.MODAL_CREATE_FACTOR_BUTTON}`,
              type: 'button-afirmative',
              onTap: function(e) {
                StorageStatus.setStatus({status:true});
              }
            }]
          });


        }

        $scope.goToProject = function(){$state.go("project");};

        $scope.goToPenaltyEnergyEffiency = function(){$state.go("factor");};

        $scope.goToQuotes = function(){$state.go("quotation");};

        $scope.goToSettings = function(){
          $state.go("settings");
        }

        $ionicPlatform.registerBackButtonAction(function () {


          ionic.Platform.exitApp();
        }, 100);


        $scope.goToProfile =  function(){
          if(StorageUserModel.getCurrentUser().type_user === 'explorer'){
            $scope.openModalRegister();
          }else{
            $state.go("settings");
          }
        }

        $scope.goToProjects =  function(){
          $state.go("project");
        }



        $scope.registerUser = function (){

          $ionicLoading.show({
            templateUrl:"loading.html"
          });
          User.registerUser($scope.register).then(function(_response){

            StorageUserModel.setCurrentUser(_response.data);
            setTimeout(function () {
              $ionicLoading.hide();
              $ionicSlideBoxDelegate.slide(1)
            }, 2000);

          },function(_error){
            $ionicLoading.hide();
            console.error(_error)

          })
        };



        $ionicModal.fromTemplateUrl('modal-register', {
          scope: $scope,
          animation: 'slide-in-up'

        }).then(function(modal) {
          $scope.modalRegister = modal;
          $scope.modalRegister.hardwareBackButtonClose = false;
        });


        $scope.openModalRegister = function() {
          $scope.modalRegister.show();
        };
        $scope.closeModalRegister = function() {
          $scope.modalRegister.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
          $scope.modalRegister.remove();
        });
        // Execute action on hide modal
        $scope.$on('modalRegister.hidden', function() {
          // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modalRegister.removed', function() {
          // Execute action
        });




        $scope.validateSlider1 =function(){

          if ($scope.register.email === undefined || $scope.register.email === ''){
            Utils.validateToast($scope.translations.REGISTER_EMAIL_EMPTY_ERROR);
            return;
          }

          if ($scope.register.password === undefined || $scope.register.password === ''){
            Utils.validateToast($scope.translations.REGISTER_PASSWORD_EMPTY_ERROR);
            return;
          }

          if ($scope.register.password_confirmation === undefined || $scope.register.password_confirmation === ''){
            Utils.validateToast($scope.translations.REGISTER_PASSWORD_CONFIRMATION_EMPTY_ERROR);
            return;
          }

          if ($scope.register.password_confirmation !== $scope.register.password){
            Utils.validateToast($scope.translations.REGISTER_PASSWORD_CONFIRMATION_UNMATCH_ERROR);
            return;
          }

          var user = $scope.register;

          $scope.registerUser(user);

        };


        $scope.registerUser = function (_user){

          $ionicLoading.show({
            templateUrl:"loading.html",
          });
          User.registerUser(_user).then(function(_response){

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


        $scope.finish= function(){
          $scope.closeModalRegister();
          // $state.go("dashboard")
        };

      });
    }]);
  }).call(this);
