'use strict';

(function() {
  this.app.factory('Motors', ['$http', '$q', 'ENV','StorageUserModel',
  function($http, $q, ENV,StorageUserService){


    return {
      create: function(_user_info,_calculation,calculation_id) {

        

        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + ENV.CREATE_CALCULATION+ "/"+calculation_id+"/motors",
          method: 'POST',
          headers:{
            username:_user_info.username,
            token:_user_info.authentication_token
          },
          data:{
            motor:{
                calculation_id:calculation_id,
                name:_calculation.name,
                rated_power:_calculation.rated_power, //potencia
                average_time:_calculation.hours,
                volts:_calculation.voltaje,
                amp:_calculation.amp,
                efficiency:_calculation.power_factor // power factor
            }
          }
        }).then(function(_response) {
          defer.resolve(_response);

        }, function(_error) {
          defer.reject(_error);
        });
        return defer.promise;
      },

      getByCalculation: function(_calculation_id,_user_info) {
        let defer = $q.defer();
        $http({
          url: ENV.LOCAL + "api/calculations/"+_calculation_id+"/motors",
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
