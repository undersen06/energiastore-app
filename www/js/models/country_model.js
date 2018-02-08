
'use strict';

(function() {
  this.app.service('StorageCountryModel', ['$q', '$localStorage', function($q, $localStorage) {

    let country;
    let selectedCountry;
    let selectedCurrency;
    let currency;

    return {
      getCurrentCountry: function() {
        return country = $localStorage.country;
      },

      setCurrentCountry: function(data) {
        $localStorage.country = data;
      },

      destroyCurrentCountry: function() {
        delete $localStorage.country;
        return true;
      },

      getCurrencies: function() {
        return currency = $localStorage.currency;
      },

      setCurrencies: function(data) {
        $localStorage.currency = data;
      },

      destroyCurrencies: function() {
        delete $localStorage.currency;
        return true;
      },

      selectCountry: function(_data) {
        $localStorage.selectedCountry = _data;
      },

      getSelectedCountry: function(_data) {
        return selectedCountry = $localStorage.selectedCountry;
      },

      getSelectedCurrency: function(_data) {
        return selectedCurrency = $localStorage.selectedCurrency;
      },

      selectCurrency: function(_data) {
        $localStorage.selectedCurrency = _data;
      }
    };

  }]);
}).call(this);
