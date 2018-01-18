'use strict';

(function() {
  this.app.service('popUpService', ['$q', '$ionicPopup','$rootScope','ENV',  function($q, $ionicPopup,$rootScope,ENV) {


    return{

      showPopUpFailCreateFactor : function(_translation){
        let deferred = $q.defer();
        let button_exit_lesson = [{ text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-afirmative',onTap: function(e) {
          return true;
        }}];

        $ionicPopup.show({
          title: '<img src="./img/error.png" class="img-about-us">',
          template: `<p class="popup-subtitle">${_translation.MODAL_FAIL_CREATE_FACTOR_TEXT}</p>`,
          cssClass: '',
          buttons:button_exit_lesson,
        },).then(function(_res){
          deferred.resolve(_res);

        });
        return deferred.promise;





      },
      showPopUpHelpMotor : function(_title,_body,_translation){
        let deferred = $q.defer();
        let button_exit_lesson = [{ text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
          $state.go("dashboard");
        }}];

        $ionicPopup.show({
          title: '<div class="congrats"></div><img src="img/special_icons/pulgar3_bad.png" class="modal-img-config">',
          subTitle: `<br><span class="modal-title-config">${_title}</span><br><span class="modal-body-subtitle">${_body}</span>`,
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        },).then(function(_res){
          deferred.resolve(_res);

        });
        return deferred.promise;
      },


      showpopUpProfileFail : function(_translation){
        let deferred = $q.defer();
        let button_exit_lesson = [{ text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
          return true;
        }}];

        $ionicPopup.show({
          title: '<img src="./img/error.png" class="img-about-us">',
          template: `<p class="popup-subtitle">${_translation.MODAL_PROFILE_FAIL_BODY}</p>`,
          cssClass: 'successClass',
          buttons:button_exit_lesson,
        },).then(function(_res){
          deferred.resolve(_res);

        });
        return deferred.promise;
      },
      showpopUpProfileCreate : function(_translation){
        let deferred = $q.defer();
        let button_exit_lesson = [{ text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON,  type: 'button-special',onTap: function(e) {
          return true;
        }}];
        

        $ionicPopup.show({
          title: '<img src="./img/common/stars.png" class="img-about-us">',
          template: `<p class="popup-subtitle">${_translation.PROFILE_COMPLETED}</p>`,
          cssClass: '',
          buttons:button_exit_lesson,
        },).then(function(_res){
          deferred.resolve(_res);

        });
        return deferred.promise;
      },
      showPopupLeaveRegister : function(_translation){
        let deferred = $q.defer();
        let buttons = [
          { text: `${_translation.REGISTER_POPUP_LEAVE_BUTTON}`,  type: 'button-special',onTap: function(e) {
            return 2;
          }},{ text: `${_translation.REGISTER_POPUP_CONTINUE_BUTTON}`,  type: 'button-afirmative',onTap: function(e) {
            return 1;
          }}];

          $ionicPopup.show({
            title: '<img src="./img/logout.png" class="img-about-us">',
            template: `<p class="popup-subtitle">${_translation.REGISTER_POPUP_LEAVE_TEXT}</p>`,
            cssClass: '',
            buttons:buttons,
          },).then(function(_res){
            deferred.resolve(_res);

          });
          return deferred.promise;
        },


        showPopupTokenProblem : function(_translation){
          let deferred = $q.defer();
          let buttons = [
            { text: `${_translation.TOKEN_PROBLEM_BUTTON}`,  type: 'button-afirmative',onTap: function(e) {
              return true;
            }}];

            $ionicPopup.show({
              title: '<img src="./img/error.png" class="img-about-us">',
              template: `<p class="popup-subtitle">${_translation.TOKEN_PROBLEM_TEXT}</p>`,
              buttons:buttons,
              animation: 'fade-in',
            },).then(function(_res){
              deferred.resolve(_res);

            });
            return deferred.promise;
          },

          showPopupOnlyOneProject : function(_translation){
            let deferred = $q.defer();
            let buttons = [
              { text: `${_translation.TOKEN_PROBLEM_BUTTON}`,  type: 'button-afirmative',onTap: function(e) {
                return true;
              }}];

              $ionicPopup.show({
                title: '<img src="./img/error.png" class="img-about-us">',
                subTitle: `<span class="popup-title">${_translation.WORKING_ON_TITLE}</span>`,
                template: `<p class="popup-subtitle">${_translation.EXPLORER_ONLY_ONE_PROJECT}</p>`,
                buttons:buttons,
                animation: 'fade-in',
              },).then(function(_res){
                deferred.resolve(_res);

              });
              return deferred.promise;
            },




            showPopupQuotationOnlyUser : function(_translation){
              let deferred = $q.defer();
              let buttons = [
                { text: `${_translation.OK_BUTTON_QUOTE}`,  type: 'button-afirmative',onTap: function(e) {
                  return true;
                }}];

                $ionicPopup.show({
                  title: '<img src="./img/error.png" class="img-about-us">',
                  subTitle: `<span class="popup-title">${_translation.WORKING_ON_TITLE}</span>`,
                  template: `<p class="popup-subtitle">${_translation.EXPLORER_ONLY_QUOTATIONS}</p>`,
                  buttons:buttons,
                  animation: 'fade-in',
                },).then(function(_res){
                  deferred.resolve(_res);

                });
                return deferred.promise;
              },


            showPopUpRegister: function(_translation){

              let deferred = $q.defer();
              let buttons = [
                { text: `${_translation.REGISTER_EXPLORER_BUTTON_NO}`,  type: 'button-special',onTap: function(e) {
                  return true;
                }},{ text: `${_translation.REGISTER_EXPLORER_BUTTON_YES}`,  type: 'button-afirmative',onTap: function(e) {
                  return false;
                }}];

                $ionicPopup.show({
                  title: '<img src="img/common/stars.png" class="img-about-us">',
                  subTitle: `<span class="popup-title">${_translation.REGISTER_EXPLORER_TITLE}</span>`,
                  template: `<p class="popup-subtitle">${_translation.REGISTER_EXPLORER_TEXT}`,
                  buttons:buttons,
                  animation: 'fade-in'
                },).then(function(_res){
                  deferred.resolve(_res);

                });
                return deferred.promise;
              },


              showPopUpExitExplorer: function(_translation){

                let deferred = $q.defer();
                let buttons = [
                  { text: `${_translation.LOGOUT_EXPLORER_BUTTON_STAY}`,  type: 'button-afirmative',onTap: function(e) {
                    return true;
                  }},{ text: `${_translation.LOGOUT_EXPLORER_BUTTON_LEAVE}`,  type: 'button-special',onTap: function(e) {
                    return false;
                  }}];

                  $ionicPopup.show({
                    title: '<img src="img/logout.png" class="img-about-us">',
                    subTitle: `<span class="popup-title">${_translation.LOG_OUT_EXPLORER_TITLE}</span>`,
                    template: `<p class="popup-subtitle">${_translation.LOG_OUT_EXPLORER_TEXT}`,
                    cssClass: '',
                    buttons:buttons,
                  },).then(function(_res){
                    deferred.resolve(_res);

                  });
                  return deferred.promise;
                },

              };

            }]);

          }).call(this);
