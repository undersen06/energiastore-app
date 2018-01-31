'use strict';

(function() {
  this.app.factory('$Country', ['$http', '$q', 'ENV','StorageUserModel',
  function($http, $q, ENV,StorageUserService){


    return {
      getAllCountries: function() {

        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.GET_COUNTRIES,
          method: 'GET',
        }).then(function(_response) {
          defer.resolve(_response);

        }, function(_error) {
          defer.reject(_error);
        });
        return defer.promise;
      },

      getAllCurrencies: function() {
        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.GET_CURRENCIES,
          method: 'GET',
        }).then(function(_response) {
          defer.resolve(_response);

        }, function(_error) {
          defer.reject(_error);
        });
        return defer.promise;
      }

    }
  }]);
}).call(this);
