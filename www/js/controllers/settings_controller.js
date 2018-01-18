// "use strict";
//
// /*
// =============================================================================
// CONTROLLER DEFINITION
// =============================================================================
// */
// (function() {
//   this.app.controller("SettingsController", ["$scope", "$state","$ionicPlatform","$rootScope","Session","StorageUserModel","User","$resource","translationService","popUpService","$cordovaStatusbar","Utils",
//   function($scope, $state,$ionicPlatform,$rootScope,Session,StorageUserModel,User,$resource,translationService,popUpService,$cordovaStatusbar,Utils) {
//
//     $ionicPlatform.ready(function() {
//
//       const languageFilePath = translationService.getTranslation();
//       $resource(languageFilePath).get(function (data) {
//         $scope.translations = data;
//       });
//
//
//       $scope.placeholder = {};
//       $scope.user = {};
//
//       $scope.init = function(){
//
//         let user  = StorageUserModel.getCurrentUser();
//
//
//         $scope.placeholder.name = "Nombre";
//         $scope.placeholder.last_name = "Apellido";
//         $scope.placeholder.phone = "Telefono";
//         $scope.placeholder.address = "Direccion";
//
//         if(user.name!== undefined){$scope.placeholder.name = user.name;}
//         if(user.last_name!== undefined){$scope.placeholder.name = user.last_name;}
//         if(user.phone!== undefined){$scope.placeholder.name = user.phone;}
//         if(user.address!== undefined){$scope.placeholder.name = user.address;}
//
//       };
//
//
//       $scope.$on("$ionicView.beforeEnter", function(event) {
//         let user = Object.assign({}, StorageUserModel.getCurrentUser());
//
//         if (user.name !== undefined)
//         $scope.placeholder.name = user.name;
//
//         if (user.last_name !== undefined)
//         $scope.placeholder.last_name = user.last_name;
//
//         if (user.phone !== undefined)
//         $scope.placeholder.phone = user.phone;
//
//         if (user.address !== undefined)
//         $scope.placeholder.address = user.address;
//
//       });
//
//
//       $scope.changeLanguage = function(){
//
//       };
//
//       $scope.backButton = function(){
//         $state.go("dashboard");
//       };
//
//       $ionicPlatform.registerBackButtonAction(function () {
//         $scope.backButton();
//       }, 100);
//
//       $scope.logOut = function (){
//
//         popUpService.showpopUpLogOut($scope.translations).then(function(_response){
//           if(_response){
//             try{
//               Session.logout().then(function(){
//                 $scope.deleteData();
//
//               },function(_error){
//                 $scope.deleteData();
//
//               })
//             }catch(_error){
//               $scope.deleteData();
//             }
//           }
//         });
//
//
//
//
//
//       };
//
//       $scope.updateInfo = function(){
//
//         if($scope.user.name === undefined || $scope.user.name  === ''){
//           Materialize.toast("Complete nombre",4000);
//           return;
//         }
//
//         if($scope.user.last_name === undefined || $scope.user.last_name  === ''){
//           Materialize.toast("Complete apellido",4000);
//           return;
//         }
//         if($scope.user.phone === undefined || $scope.user.phone  === ''){
//           Materialize.toast("Complete telefono",4000);
//           return;
//         }
//         if($scope.user.address === undefined || $scope.user.address  === ''){
//           Materialize.toast("Complete dirección",4000);
//           return;
//         }
//
//
//
//         User.updateUser(StorageUserModel.getCurrentUser(),$scope.user).then(function(_response){
//           StorageUserModel.setCurrentUser(_response.data);
//           popUpService.showpopUpProfileCreate($scope.translations);
//           console.log(_response);
//         },function(_error){
//           popUpService.showpopUpProfileFail($scope.translations);
//           console.error(_error);
//
//         })
//
//
//
//       };
//
//       $scope.deleteData= function (){
//         StorageUserModel.destroyCurrentUser();
//         $state.go("login")
//       };
//
//
//               $scope.goToProjects= function(){
//                 $state.go('project');
//               }
//               $scope.goToProfile= function(){
//                 $state.go('settings');
//               }
//               $scope.goToQuotes= function(){
//
//                 $state.go('quotation');
//               }
//
//
//
//     });
//   }]);
// }).call(this);
