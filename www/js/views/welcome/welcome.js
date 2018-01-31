"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("WelcomeController", ["$scope", "$state","$ionicPlatform","$resource","translationService","$cordovaStatusbar","$ionicSlideBoxDelegate","StorageLanguageModel","$Country","StorageCountryModel","$q","popUpService",
  function($scope, $state,$ionicPlatform,$resource,translationService,$cordovaStatusbar,$ionicSlideBoxDelegate,StorageLanguageModel,$Country,StorageCountryModel,$q,popUpService) {
    $ionicPlatform.ready(function() {






       function loadCountries(){

        var promises =[$Country.getAllCurrencies(),$Country.getAllCountries()]

        $q.all(promises).then(function(_resolves){
          $scope.curencies = _resolves[0].data;
          $scope.countries = _resolves[1].data;
        },function(_error){

          popUpService.showpopupCountries().then(function(_response){
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

        var _country = _.find($scope.countries, { 'id': country});
        var currency = _.find($scope.curencies, { 'id': _country.currency_id});

        StorageCountryModel.selectCountry(_country);
        StorageCountryModel.selectCurrency(currency);

        $state.go("introduction")

      }

      $scope.stop = function () {
        $ionicSlideBoxDelegate.enableSlide(false);
      };


loadCountries();

    });
  }]);
}).call(this);
