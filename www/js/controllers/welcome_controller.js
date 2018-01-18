"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("WelcomeController", ["$scope", "$state","$ionicPlatform","$rootScope","translationService","$resource","popUpService","StorageLanguageModel","$cordovaStatusbar","Utils",
  function($scope, $state,$ionicPlatform,$rootScope,translationService,$resource,popUpService,StorageLanguageModel,$cordovaStatusbar,Utils) {
  $ionicPlatform.ready(function() {

    $scope.translations = {};

    if (window.StatusBar) {
      $cordovaStatusbar.overlaysWebView(false);
      $cordovaStatusbar.style(0);
      $cordovaStatusbar.hide();
    }


    $scope.chooseLanguage = function(_language = 'es'){

        StorageLanguageModel.setCurrentLanguage(_language);
        $resource(translationService.getTranslation()).get(function (data) {

            $scope.translations = data;
            $scope.popUpLanguage();

        });

    };



    $scope.popUpLanguage = function(){
            $state.go('introduction');
    };


    $scope.goToSlide = function(){
      $state.go('introduction',{reload:true})
    };

    $ionicPlatform.registerBackButtonAction(function () {
      ionic.Platform.exitApp();
    }, 100);


    'use strict';

    var land = document.querySelectorAll('.land');
    var cloud = document.querySelectorAll('.cloud');

    for (var i = 0; i < land.length; i++) {
    	land[i].style.transform = 'translate(' + Math.round(Math.random() * 150) + 'px, ' + Math.round(Math.random() * 150) + 'px)';
    	land[i].style.width = Math.round(Math.random() * 50) + 50 + 'px';
    }

    for (var i = 0; i < cloud.length; i++) {
    	cloud[i].style.transform = 'translate(' + Math.round(Math.random() * 150) + 'px, ' + Math.round(Math.random() * 150) + 'px)';
    	cloud[i].style.width = Math.round(Math.random() * 25) + 25 + 'px';
    }

    requestAnimationFrame(animate);

    function animate() {
    	for (var i = 0; i < land.length; i++) {
    		move(land[i]);
    		move(cloud[i]);
    	}

    	requestAnimationFrame(animate);
    }

    function move(el) {
    	var s = el.style.transform.split('(')[1].split(',');
    	var x = s[0].split('px')[0];
    	var y = s[1];
    	var w = el.style.width.split('px')[0];

    	var nx = parseInt(x) - 1;

    	if (nx + parseInt(w) < -20) {
    		nx = 170;
    	}
    	el.style.transform = 'translate(' + nx + 'px, ' + y;
    }




    });
  }]);
}).call(this);
