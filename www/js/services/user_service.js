'use strict';

(function() {
  this.app.factory('User', ['$http', '$q', 'ENV','StorageUserModel',
  function($http, $q, ENV, StorageUserService){


    return {
      registerUser: function(_user) {
        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.SIGN_UP,
          method: 'POST',
          data:{
            user:{
              username:_user.email,
              password:_user.password,
              password_confirmation:_user.password_confirmation
            }
          }
        }).then(function(_response) {
          defer.resolve(_response);

        }, function(_error) {
          defer.reject(_error);
        });
        return defer.promise;
      },

      updateUser: function(_user,_info) {

        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.UPDATE_USER_API+_user.id,
          method: 'PATCH',
          headers:{
            username:_user.username,
            token:_user.authentication_token
          },
          data:{
            user:{
              email:_user.username,
              phone:_info.phone,
              address:_info.address,
              name:_info.name,
              last_name:_info.last_name,
              city:_info.city,
              country:_info.country
            }
          }
        }).then(function(_response) {
          defer.resolve(_response);

        }, function(_error) {
          defer.reject(_error);
        });
        return defer.promise;
      },


    }
  }]);
}).call(this);
