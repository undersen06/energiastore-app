"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("WelcomeController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","StorageLanguageModel","$Country","StorageCountryModel","$q","popUpService","StorageUserModel","User",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,StorageLanguageModel,$Country,StorageCountryModel,$q,popUpService,StorageUserModel,User) {
    $ionicPlatform.ready(function() {

      $scope.isIphoneX =  function(){
        if(ionic.Platform.device().model != undefined){
          if(ionic.Platform.device().model.startsWith('iPhone10')){
            return true;
          }
        }
      }

       function loadCountries(){

        var promises =[$Country.getAllCurrencies(),$Country.getAllCountries()]

        $q.all(promises).then(function(_resolves){
          $scope.curencies = _resolves[0].data;
          $scope.countries = _resolves[1].data;
          debugger;
        },function(_error){

          popUpService.showpopupCountries().then(function(_response){
            debugger;
            loadCountries();
          });
        })

      }





      $scope.chooseLanguage = function(_language){
        StorageLanguageModel.setCurrentLanguage(_language);
        $resource(translationService.getTranslation()).get(function (data) {
            $scope.translations = data;
            $ionicSlideBoxDelegate.slide(1);
        });

        $ionicSlideBoxDelegate.enableSlide(false);

      }
      $scope.chooseCountry = function(country){


        var _country = _.find($scope.countries, { 'id': country.id});
        var currency = _.find($scope.curencies, { 'id': _country.currency_id});

        StorageCountryModel.selectCountry(_country);
        StorageCountryModel.selectCurrency(currency);

        if(StorageUserModel.getCurrentUser()!= undefined){
          if(StorageUserModel.getCurrentUser().id != undefined){
            User.updateCountry(StorageUserModel.getCurrentUser(),_country.name).then(function(_success){
            },function(_error){
              // debugger;

            })
          }
        }

        $state.go("introduction")

      }

      $scope.stop = function () {
        $ionicSlideBoxDelegate.enableSlide(false);
      };


loadCountries();

    });
  }]);
}).call(this);
