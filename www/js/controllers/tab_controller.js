"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("TabController", ["$scope", "$state","$ionicPlatform","$ionicTabsDelegate","StorageUserModel",
  function($scope, $state,$ionicPlatform,$ionicTabsDelegate,StorageUserModel) {

    $ionicPlatform.ready(function() {




// $scope.$on('$ionicNavView.ionViewCanEnter', function() {
       // console.log('before leave');
       $scope.currentState = $state.current.name;


       var a =$("#1");


       $scope.init= function(){

       }
       $scope.user = StorageUserModel.getCurrentUser();


       $scope.isHidden = function(){
         return true;
       }
   // });


      //
      //
      // switch (a) {
      //   case 'tab.motors':
      //
      //     break;
      //   default:
      //
      // }

       // $scope.goToProject= function(){
       //    $state.go('tab.project');
       // }
       //
       // $scope.goToProfile= function(){
       //
       // }
       //
       // $scope.goToQuotation= function(){
       //
       // }

       // init()


    });
  }]);
}).call(this);
