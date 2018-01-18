'use strict';

(function() {
  this.app.factory('Quotation', ['$http', '$q', 'ENV','StorageUserModel',
  function($http, $q, ENV,StorageUserModel){


    return {
      Create: function(_user_info,_quotation) {
        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + `api/calculations/${_quotation.calculation_id}/quotations`,
          method: 'POST',
          headers:{
            username:_user_info.username,
            token:_user_info.authentication_token
          },
          data:
          { quotation:
            {
              calculation_id:_quotation.calculation_id,
              user_id:_quotation.user_id,
              comment:_quotation.comment,
              reference:_quotation.reference
            }
          }
        }).then(function(_response) {
          defer.resolve(_response);

        }, function(_error) {
          defer.reject(_error);
        });
        return defer.promise;
      },

      index: function(_user_info) {
        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + `api/calculations/`,
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
      },



      getAvaliablesPDFById: function(_user_info,id) {
        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + 'api/calculations/'+id+'/quotations',
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
      },

    }

  }]);
}).call(this);
