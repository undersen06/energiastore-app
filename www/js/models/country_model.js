
'use strict';

(function() {
  this.app.service('StorageCountryModel', ['$q', '$localStorage', function($q, $localStorage) {

    let country;
    let selectedCountry;
    let selectedCurrency;

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

      selectCountry: function(_data) {
        $localStorage.selectedCountry = _data;
      },

      selectCurrency: function(_data) {
        $localStorage.selectedCurrency = _data;
      }
    };

  }]);
}).call(this);
