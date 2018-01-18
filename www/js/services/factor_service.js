'use strict';

(function() {
  this.app.factory('Factor', ['$http', '$q', 'ENV','StorageUserModel',
  function($http, $q, ENV,StorageUserService){


    return {
      getAllFactors: function(_user_info) {

        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + `api/quotations`,
          method: 'GET',
          headers:{
            username:_user_info.username,
            token:_user_info.authentication_token
          }
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
