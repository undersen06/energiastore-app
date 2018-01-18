"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("FactorsController", ["$scope", "$state","$ionicPlatform","$ionicSlideBoxDelegate","User","$ionicLoading","StorageUserModel","$resource","translationService","$cordovaStatusbar","Utils","popUpService","StorageFactorModel","Factor","$cordovaFileTransfer","$cordovaFileOpener2","$ionicModal","FactorPenalty","$cordovaActionSheet","$cordovaCamera","$filter",
  function($scope, $state,$ionicPlatform,$ionicSlideBoxDelegate,User,$ionicLoading,StorageUserModel,$resource,translationService,$cordovaStatusbar,Utils,popUpService,StorageFactorModel,Factor,$cordovaFileTransfer,$cordovaFileOpener2,$ionicModal,FactorPenalty,$cordovaActionSheet,$cordovaCamera,$filter) {

    $ionicPlatform.ready(function() {

      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
        $scope.translations = data;
        $scope.options = { title: $scope.translations.ACTION_SHEET_PHOTO_TITLE, buttonLabels: [$scope.translations.ACTION_SHEET_PHOTO_CAMERA, $scope.translations.ACTION_SHEET_PHOTO_GALERY], addCancelButtonWithLabel: $scope.translations.CHOOSE_LANGUAGE_CANCEL, androidEnableCancelButton: true, winphoneEnableCancelButton: true };
      });

      $scope.factors = {};
      $scope.factorType ={};
      $scope.image = "img/placeholder.png";
      $scope.os = ionic.Platform.platform();
      $scope.user = StorageUserModel.getCurrentUser();
      $scope.register={};
      // $scope.factorType.power_factor;

      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      }
      // $scope.factorType.power_factor = 0;
      // var a = $filter('number')($scope.factorType.power_factor, 3);
      // $scope.factorType.power_factor = a;


      $scope.format = function(input)
      {
        var a =$scope.factorType.power_factor
        a = a+'';
      var num = a.replace(/\./g,'');
      if(!isNaN(num)){
      num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
      num = num.split('').reverse().join('').replace(/^[\.]/,'');
      $scope.factorType.power_factor = num;
    }
  }

//   function format(input)
// {
// var num = input.value.replace(/\./g,'');
// if(!isNaN(num)){
// num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
// num = num.split('').reverse().join('').replace(/^[\.]/,'');
// input.value = num;
// }
// }

      const _input_penalty = $('#input-penalty');
      const _button_camera = $('#button-camera');
      const _button_galley = $('#button-gallery');

      $scope.init = function(){
        $scope.getFactors();
      }

      $scope.doRefreshFactor= function(){

        $scope.getFactors();
      }

      $scope.getFactors = function(){
        //
        if(StorageUserModel.getCurrentUser().type_user === 'explorer'){
          //

          // $scope.factors[0] = StorageFactorModel.getFactors();
          $scope.$broadcast("scroll.refreshComplete");


        }else{
          Factor.getAllFactors(StorageUserModel.getCurrentUser()).then(function(_response){

            $scope.factors = _response.data;

            $scope.$broadcast("scroll.refreshComplete");


          },function(_error){

          })
        }

      }

      $scope.viewPdf = function(calculation){

        $ionicLoading.show({
          templateUrl:"loading.html"
        }).then(function () {
          var url = `http://kvar.herokuapp.com/api/calculations/${calculation.calculation_id}/quotations/${calculation.id}/pdf`;
          $scope.downloadFile(url);
        });

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
            // $timeout(function() {
            //   $scope.downloadProgress =
            //   progress.loaded / progress.total * 100;
            //   if ($scope.downloadProgress === 100) {
            //     $("#btn-play-pdf").removeClass("disabled");
            //   }
            // });
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
            $scope.closeModalQuote();
            $state.go('factor',{},{reload:true})

          },
          function(err) {
            console.error(err);

            // An error occurred. Show a message to the user
          }
        );
      };




      $scope.back = function(){
        $state,go('dashboard');
      }
      $scope.goToProjects= function(){
        $state.go('project');
      }
      $scope.goToProfile= function(){
        $state.go('settings');
      }
      $scope.goToQuotes= function(){
        $state.go('factor');
      }



      $ionicModal.fromTemplateUrl('modal-add-quote', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modalQuote = modal;
      });


      $scope.openModalQuote = function() {
        $scope.modalQuote.show();
      };
      $scope.closeModalQuote = function() {
        $scope.modalQuote.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modalQuote.remove();
      });
      // Execute action on hide modal
      $scope.$on('modalQuote.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modalQuote.removed', function() {
        // Execute action
      });

      $ionicModal.fromTemplateUrl('modal-help', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modalHelp = modal;
      });


      $scope.openModalHelp = function() {
        $scope.modalHelp.show();
      };
      $scope.closeModalHelp = function() {
        $scope.modalHelp.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modalHelp.remove();
      });
      // Execute action on hide modal
      $scope.$on('modalHelp.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modalHelp.removed', function() {
        // Execute action
      });


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


      // if (window.cordova){
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
      // }




      $scope.createFactorPenalty =  function (){
        if($scope.factorType.power_factor === undefined || $scope.factorType.power_factor === 0){
          Utils.validateToast($scope.translations.QUOTATION_AMOUNT_EMPTY);
          return;
        }

        if($scope.factorType.power_factor < 1000 ){
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

}else{
        $ionicLoading.show({
          templateUrl:"loading.html"
        }).then(function () {


            $scope.CreateQuoate(calculation);
          });
        }
    }



    $scope.CreateQuoate = function(calculation){

      FactorPenalty.create(calculation,StorageUserModel.getCurrentUser()).then(function(_response){


        StorageFactorModel.destroyFactor();
        $scope.viewPdf(_response.data);




      },function(_error){

        console.error(_error);
        $ionicLoading.hide();
        popUpService.showPopUpFailCreateFactor($scope.translations).then(function(_response){
          $state.go("dashboard");
        });
      })
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

    $scope.back = function(){
      $state.go('dashboard')
    }


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


    });
  }]);
}).call(this);
