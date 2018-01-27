'use strict';
/*
=========================================
PLATFORM CONFIGURATION
=========================================
*/

(function() {
  this.app.run(function($ionicPlatform,$rootScope,$cordovaAppVersion) {

    $ionicPlatform.ready(function() {

      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(false);

        var notificationOpenedCallback = function(jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
          };

          window.plugins.OneSignal.startInit("344f2a67-3475-4b44-8aeb-f5bcdab1049c").endInit();
            // .handleNotificationOpened(notificationOpenedCallback)


            window.plugins.OneSignal.getIds(function (ids) {
                 console.log('UserID:  ' + ids.userId);
                 console.log('PushToken:  ' + ids.pushToken);

                 // $rootScope.user_id = ids.userId;
                 // $rootScope.pushToken = ids.pushToken;
             });

      }


      if (window.StatusBar) {
                StatusBar.overlaysWebView(false);
            }

    });
  })
}).call(this);
