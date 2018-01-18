'use strict';

(function() {
  this.app.factory('Session', ['$http', '$q', 'ENV','StorageUserModel',
  function($http, $q, ENV,StorageUserModel){


    return {
      login: function(_user) {
        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.SIGN_IN,
          method: 'POST',
          data:{
            user:{
              username:_user.email,
              password:_user.password
            }
          }
        }).then(function(_response) {
          defer.resolve(_response);

        }, function(_error) {
          defer.reject(_error);
        });
        return defer.promise;
      },
      logout: function() {
        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.LOG_OUT,
          method: 'POST',
          headers:{
            username:StorageUserModel.getCurrentUser().username,
            token:StorageUserModel.getCurrentUser().authentication_token
          },
          data:{
            user:{
              authentication_token:StorageUserModel.getCurrentUser().authentication_token
            }
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
