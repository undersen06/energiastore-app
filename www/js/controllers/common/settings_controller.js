"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("SettingsController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","$timeout","StorageUserModel","StorageLanguageModel","$ionicPopup","$cordovaActionSheet","StorageStatus","StorageProject","StorageMotor","StorageQuotation","$ionicModal","User","$ionicLoading","popUpService",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,$timeout,StorageUserModel,StorageLanguageModel,$ionicPopup,$cordovaActionSheet,StorageStatus,StorageProject,StorageMotor,StorageQuotation,$ionicModal,User,$ionicLoading,popUpService) {

    $scope.user = StorageUserModel.getCurrentUser();

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

      // $scope.chooseLanguage = function(_language){
      //   StorageLanguageModel.setCurrentLanguage(_language);
      //   $resource(translationService.getTranslation()).get(function (data) {
      //       $scope.translations = data;

      //         $scope.deleteData()
      //       }}];
      //   });
      //
      //   $ionicSlideBoxDelegate.enableSlide(false);
      //
      // }

      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
        $scope.translations = data;
        $scope.options = { title: $scope.translations.CHOOSE_LANGUAGE_TEXT, buttonLabels: [$scope.translations.CHOOSE_LANGUAGE_ENGLISH,$scope.translations.CHOOSE_LANGUAGE_SPANISH], addCancelButtonWithLabel: $scope.translations.CHOOSE_LANGUAGE_CANCEL, androidEnableCancelButton: true, winphoneEnableCancelButton: true };
        $scope.button_exit_lesson = [{ text: $scope.translations.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
        }}]
        // $scope.init();
      });


      $scope.register = {};


      $scope.chooseCountry = function(country){
        $state.go('introduction')
      }
      $scope.goToProfile =  function(){
        $state.go('profile')
      }
      $scope.chooseLanguaje =  function(){
        $scope.showLanguageOptions();
      }
      $scope.chooseCountry =  function(){

      }
      $scope.goToTutorials =  function(){
        $state.go('tutorials')
      }

      $scope.goBack = function(){
        $state.go('dashboard');
      }

      $scope.FAQ =  function(){
        $scope.workingOnPopUp();
      }


      // $scope.logOut =  function(){
      //
      // }

      $scope.goToRegister = function(){

        $scope.openModalRegister();
      }


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

        $scope.registerUser();

      };


      $scope.registerUser = function (){

        $ionicLoading.show({
          templateUrl:"loading.html"
        });
        User.registerUser($scope.register).then(function(_response){

          _response.data.type_user = "user";

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
        $state.go('dashboard')
        $scope.closeModalRegister();
        $ionicLoading.show({
          template: `${$scope.translations.LOADING}...`
        });


      };

      $scope.Close = function(){
        $scope.closeModalRegister();
      }



      $scope.logOut = function (){


        if(StorageUserModel.getCurrentUser().type_user == 'explorer'){
          popUpService.showPopUpExitExplorer($scope.translations).then(function(_response){
            if(!_response){
              $scope.deleteData();
            }
          })
        }else{




          var myPopup = $ionicPopup.show({
            animation: 'fade-in',
            title: '<img src="./img/logout.png" class="img-about-us">',
            subTitle: `<span class="popup-title">${$scope.translations.LOG_OUT_TITLE}</span>`,
            template: `<p class="popup-subtitle">${$scope.translations.LOG_OUT_TEXT}</p>`,
            scope: $scope,
            buttons: [{
              text: `${$scope.translations.LOG_OUT_CANCEL_BUTTON}`,
              type: 'button-cancel'
            },
            {
              text: `${$scope.translations.LOG_OUT_LEAVE_BUTTON}`,
              type: 'button-afirmative',
              onTap: function(e) {
                $scope.deleteData();
              }
            }
          ]
        });
      }
    };


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

      $scope.aboutUs = function(){

        var myPopup = $ionicPopup.show({
          animation: 'fade-in',
          title: '<img src="./img/logo.png" class="img-about-us">',
          subTitle: `<span class="popup-title">${$scope.translations.ABOUT_US_TITLE}</span>`,
          template: `<p class="popup-subtitle">${$scope.translations.ABOUT_US_TEXT}</p> `,
          scope: $scope,
          buttons: [
            {
              text: `${$scope.translations.ABOUT_US_BUTTON_TEXT}`,
              type: 'button-afirmative',
              onTap: function(e) {
                // $state.go('middleware')
              }
            }
          ]
        });
      }


      if (window.cordova){
        $scope.showLanguageOptions = function(){
          $cordovaActionSheet
          .show($scope.options)
          .then(function(btnIndex) {
            switch (btnIndex) {
              case 1:
              StorageLanguageModel.setCurrentLanguage('en');
              break;

              case 2:
              StorageLanguageModel.setCurrentLanguage('es');
              break;
            }

            StorageLanguageModel.getCurrentLanguage()

            const languageFilePath = translationService.getTranslation();
            $resource(languageFilePath).get(function(data) {
              $scope.translations = data;
              $scope.options = { title: $scope.translations.CHOOSE_LANGUAGE_TEXT, buttonLabels: [$scope.translations.CHOOSE_LANGUAGE_ENGLISH,$scope.translations.CHOOSE_LANGUAGE_SPANISH], addCancelButtonWithLabel: $scope.translations.CHOOSE_LANGUAGE_CANCEL, androidEnableCancelButton: true, winphoneEnableCancelButton: true };
            });
          });
        }
      }


      $scope.deleteData= function (){
        StorageUserModel.destroyCurrentUser();
        StorageStatus.destroyStatus();
        StorageProject.destroyProjects();
        StorageMotor.destroyMotors();
        StorageQuotation.destroyQuotation();
        setTimeout(function () {
          $state.go("welcome")
        }, 100);
      };



      $ionicModal.fromTemplateUrl('modal-choose-country', {
        scope: $scope,
        animation: 'slide-in-up'

      }).then(function(modal) {
        $scope.modalChooseCountry = modal;
        $scope.modalChooseCountry.hardwareBackButtonClose = false;
      });


      $scope.openModalChooseCountry = function() {
        $scope.modalChooseCountry.show();
      };
      $scope.closeModalChooseCountry = function() {
        $scope.modalChooseCountry.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modalChooseCountry.remove();
      });
      // Execute action on hide modal
      $scope.$on('modalChooseCountry.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modalChooseCountry.removed', function() {
        // Execute action
      });


      $scope.chooseCountry = function(){
        $scope.closeModalChooseCountry();
      }

    });
  }]);
}).call(this);
