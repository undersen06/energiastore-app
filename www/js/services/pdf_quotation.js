'use strict';

(function() {
  this.app.factory('PDF', ['$http', '$q', 'ENV','StorageUserModel',
  function($http, $q, ENV,StorageUserService){


    return {
      getPDF: function(_user_info,_calculation_id,_quotation_id) {
        
        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + `api/calculations/${_calculation_id}/quotations/${_quotation_id}/pdf`,
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
