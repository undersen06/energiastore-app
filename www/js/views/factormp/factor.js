"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("FactorController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","$ionicModal","$cordovaCamera","FactorPenalty","StorageUserModel","translationService","$resource","popUpService","$cordovaStatusbar","Quotation","Utils","$cordovaActionSheet","$ionicLoading","$cordovaFileOpener2","$cordovaFileTransfer","StorageQuotation","StorageFactorModel","User",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,$ionicModal,$cordovaCamera,FactorPenalty,StorageUserModel,translationService,$resource,popUpService,$cordovaStatusbar,Quotation,Utils,$cordovaActionSheet,$ionicLoading,$cordovaFileOpener2,$cordovaFileTransfer,StorageQuotation,StorageFactorModel,User) {

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

      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
        $scope.translations = data;
        $scope.options = { title: $scope.translations.ACTION_SHEET_PHOTO_TITLE, buttonLabels: [$scope.translations.ACTION_SHEET_PHOTO_CAMERA, $scope.translations.ACTION_SHEET_PHOTO_GALERY], addCancelButtonWithLabel: $scope.translations.CHOOSE_LANGUAGE_CANCEL, androidEnableCancelButton: true, winphoneEnableCancelButton: true };
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

      $scope.image = "assets/img/photo.png";

      $scope.os = ionic.Platform.platform();
      $scope.user = StorageUserModel.getCurrentUser();
      $scope.register={};


      const _input_penalty = $('#input-penalty');
      const _button_camera = $('#button-camera');
      const _button_galley = $('#button-gallery');


      $scope.user =  StorageUserModel.getCurrentUser();

      $scope.factorType={};

      $scope.back = function(){
        $state.go("dashboard");
      };

      $scope.help = function(){
        $state.go("dashboard");
      };

      $scope.doRefresh = function(){
        Quotation.index($scope.user).then(function(_response){

          // _respose.data

          for (var i = 0; i < array.length; i++) {
            array[i]
          }

        },function(_error){


        })
      }

      $scope.openCamera = function (){

        let options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 200,
          targetHeight: 200,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true,
          correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function(_imageData) {
          $scope.factorType.photo = "data:image/jpeg;base64," + _imageData;
          $scope.image = $scope.factorType.photo;
        }, function(_err) {
          Utils.validateToast($scope.ERROR_CAMERA);
          console.log(_err);
        });

      };

      $scope.openGallery = function (){

        let options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 200,
          targetHeight: 200,
          popoverOptions: CameraPopoverOptions,
        };

        $cordovaCamera.getPicture(options).then(function(_imageData) {
          $scope.factorType.photo = "data:image/jpeg;base64," + _imageData;
          $scope.image = $scope.factorType.photo;
          // isPictureChanged=true;
        }, function(_err) {

          Utils.validateToast($scope.ERROR_GALLERY);
          console.error(_err);

        });
      };


      $scope.createFactorPenalty =  function (){
        if($scope.factorType.power_factor === undefined || $scope.factorType.power_factor === 0){
          Utils.validateToast($scope.translations.QUOTATION_AMOUNT_EMPTY);
          return;
        }

        if($scope.factorType.power_factor < 100 ){
          Utils.validateToast($scope.translations.QUOTATION_AMOUNT_MINIMUM);
          return;
        }

        let calculation = $scope.factorType;

        if(StorageUserModel.getCurrentUser().type_user === 'explorer'){

          popUpService.showPopUpRegister($scope.translations).then(function(_response){

            if(!_response){
              StorageFactorModel.setFactors(calculation);
              $scope.openModalRegister();
            }
          },function(_error){

          })

          StorageQuotation.setQuotation(calculation);

        }else{
          $ionicLoading.show({
            templateUrl:"loading.html"
          }).then(function () {


            $scope.CreateQuoate(calculation);
          });
        }
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



      $scope.CreateQuoate = function(calculation){

        FactorPenalty.create(calculation,$scope.user).then(function(_response){

          $scope.getPDF(_response.data.calculation,_response.data.id);
          // $ionicLoading.hide();
          console.log(_response)
        },function(_error){

          console.error(_error);
          $ionicLoading.hide();
          popUpService.showPopUpFailCreateFactor($scope.translations).then(function(_response){
            $state.go("dashboard");
          });
        })
      }



      if (window.cordova){
        $scope.showPopUpImage = function(){
          $cordovaActionSheet
          .show($scope.options)
          .then(function(btnIndex) {


            switch (btnIndex) {
              case 1:
              $scope.openCamera();
              break;
              case 2:
              $scope.openGallery();
              break;
              default:
              break;

            }

          });
        }
      }

      $ionicPlatform.registerBackButtonAction(function () {
        $state.go("dashboard");
      }, 100);

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
        $state.go("dashboard");
      }




      $scope.getPDF = function(param1,_quotation_id){
        // PDF.getPDF(user,$state.params.id_quotation,_quotation_id).then(function(_response){
        //
        //
        // },function(_error){
        //
        // })

        var url = `http://kvar.herokuapp.com/api/calculations/${param1}/quotations/${_quotation_id}/pdf`;

        $scope.downloadFile(url);




      }
      $scope.downloadFile = function(_url, _file_name) {

        var targetPath = cordova.file.dataDirectory;
        var trustHosts = true;
        var params= {};
        params.headers={
          token: StorageUserModel.getCurrentUser().authentication_token,
          username: StorageUserModel.getCurrentUser().username
        };


        var path = targetPath + _file_name;

        $cordovaFileTransfer.download(_url, targetPath+'pdf.pdf', params, trustHosts).then(
          function(result) {
            $ionicLoading.hide();
            console.log(result);
            $scope.openFile(targetPath+'pdf.pdf')


          },
          function(err) {

            // $scope.openFile(_file_name);
            console.log(err);
            // Error
          },
          function(progress) {
            // Materialize.toast("Descargando PDF",4000);
            $timeout(function() {
              $scope.downloadProgress =
              progress.loaded / progress.total * 100;
              if ($scope.downloadProgress === 100) {
                $("#btn-play-pdf").removeClass("disabled");
              }
            });
          }
        );
      };


      $scope.openFile = function(_path_file) {
        // // let path = targetPath +'/'+ _file_name;
        // var path = targetPath + _file_name;
        // console.log(path);

        $cordovaFileOpener2
        .open(_path_file, "application/pdf").then(
          function(_response) {
            console.log(_response);

            setTimeout(function () {

              $state.go("dashboard");
            }, 1000);

          },
          function(err) {
            console.error(err);

            // An error occurred. Show a message to the user
          }
        );
      };


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
        $ionicLoading.show({
          template: `${$scope.translations.LOADING}...`
        });
        $scope.persistQuotation();

      };
      $scope.disableSwipe = function() {
        $ionicSlideBoxDelegate.enableSlide(false);
      };


      $scope.persistQuotation = function(){

        var factor = StorageFactorModel.getFactors();

        $scope.CreateQuoate(factor);

      }


      $scope.Close = function(){
        $scope.closeModalRegister();
      }


    });
  }]);
}).call(this);
