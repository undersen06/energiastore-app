"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("LoginController", ["$scope", "$state","$ionicPlatform","StorageUserModel","Session","translationService","$resource","$cordovaStatusbar","$ionicLoading","Utils","popUpService",
  function($scope, $state,$ionicPlatform,StorageUserModel,Session,translationService,$resource,$cordovaStatusbar,$ionicLoading,Utils,popUpService) {

    $scope.design = {};

    if(StorageUserModel.getCurrentUser() != undefined){
      switch (StorageUserModel.getCurrentUser().type_user) {
        case 'user':
        $scope.design.header = 'user-color'
        $scope.design.color = 'user-color-font'
        break;

        case 'partner':
        $scope.design.header = 'partner-color'
        $scope.design.color = 'partner-color-font'
        break;

        case 'explorer':
        $scope.design.header = 'explorer-color'
        $scope.design.color = 'explorer-color-font'
        break;
        default:
        $scope.design.header = 'user-color'
        $scope.design.color = 'user-color-font'
        break;
      }
    }else{

      $scope.design.header = 'user-color';
      $scope.design.color = 'user-color-font';

    }
    $ionicPlatform.ready(function() {

      $scope.isIphoneX =  function(){
        if(ionic.Platform.device().model != undefined){
          if(ionic.Platform.device().model.startsWith('iPhone10')){
            return true
          }
        }
      }


      // if (window.StatusBar) {
      //   $cordovaStatusbar.overlaysWebView(false);
      //   $cordovaStatusbar.style(1);
      //   switch (StorageUserModel.getCurrentUser().type_user) {
      //     case 'explorer':
      //     $cordovaStatusbar.styleHex("#62BED4");
      //     break;
      //     case 'user':
      //     $cordovaStatusbar.styleHex("#62D485");
      //     break;
      //
      //     case 'partner':
      //     $cordovaStatusbar.styleHex("#F5A623");
      //     break;
      //     default:
      //
      //   }
      //   $cordovaStatusbar.show();
      // }

      const languageFilePath = translationService.getTranslation();
      $resource(languageFilePath).get(function (data) {
        $scope.translations = data;
      });

      $scope.user ={};

      $scope.goToRegister = function(){
        $state.go('register');

      };

      $scope.useFacebook = function(){
        // login_facebook()
        get_status_login();

      };

    function login_facebook(){
      facebookConnectPlugin.login(["public_profile", "email", "user_friends"],   function success (success) {
        get_facebook_user_info(success);
      },
      function loginError (error) {
        console.error(error)
      }
    );
    }

    function get_facebook_user_info(_data){

      facebookConnectPlugin.api(_data.authResponse.userID+"/?fields=name,id,email",["public_profile","email"],
      function onSuccess (result) {
        console.log("Result: ", result);


        if(result.email == undefined){

          alert('Hola');

          // register:

          // "type:facebook"


        }else{

          $state.go('register');

        }

          // login_facebook();
        /* logs:
        {
        "id": "000000123456789",
        "email": "myemail@example.com"
      }
      */
    }, function onError (error) {
      debugger;
      console.error("Failed: ", error);
    }
  );
}


function get_status_login(){
  facebookConnectPlugin.getLoginStatus(function success(success){

    // popUpService.showpopupFacebookEmailError()

    if(success.status == "connected"){
      debugger;
      User.login_facebook().then(function(_response){


      },function(_error){
        debugger;

      })

      // {
      //   type:"facebook",
      //   username:"user_id"
      // }

      // call api michel, verify if user exist, if not exist send to register

    }else{

      login_facebook(status);

    }


      // get_facebook_user_info();

  }, function failure(error){

  })
}


$scope.login= function (){
  if($scope.user.email === undefined || $scope.user.email === ""){
    Utils.validateToast($scope.translations.LOGIN_EMAIL_EMPTY_ERROR);
    return;
  }

  if($scope.user.password === undefined || $scope.user.password === ""){
    Utils.validateToast($scope.translations.LOGIN_PASSWORD_EMPTY_ERROR);
    return;
  }

  $ionicLoading.show({
    templateUrl:"loading.html"
    // template: `${$scope.translations.LOADING}...`
  });

  Session.login($scope.user).then(function(_response){
    StorageUserModel.setCurrentUser(_response.data);
    $state.go("dashboard");
    console.log(_response);
    $ionicLoading.hide();
  },function(_error){
    Materialize.toast($scope.translations.LOGIN_ERROR,4000);
    console.error(_error);
    $ionicLoading.hide();
  })
};

$ionicPlatform.registerBackButtonAction(function () {
  $state.Back();
}, 100);

$scope.Back = function(){
  $state.go('middleware')
}


});
}]);
}).call(this);
