
'use strict';

(function() {
  this.app.service('StorageCountryModel', ['$q', '$localStorage', function($q, $localStorage) {

    let country;

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
      }
    };

  }]);
}).call(this);
