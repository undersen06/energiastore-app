'use strict';

(function() {
  this.app.factory('FactorPenalty', ['$http', '$q', 'ENV','StorageUserModel',
  function($http, $q, ENV,StorageUserService){


    return {
      create: function(_calculation,_user_info) {
        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.CREATE_PF_QUOATATION,
          method: 'POST',
          headers:{
            username:_user_info.username,
            token:_user_info.authentication_token
          },
          data:{
             quotation:
              {
                user_id:_user_info.id,
                comment:_calculation.comment,
                reference:_calculation.photo,
                power_factor:_calculation.power_factor
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
