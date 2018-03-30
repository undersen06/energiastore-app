'use strict';

(function() {
	this.app.factory('$Motors', ['$http', '$q', 'ENV','StorageUserModel',
		function($http, $q, ENV,StorageUserModel){

      var user = StorageUserModel.getCurrentUser();

			return {
				create: function(_user_info,_calculation,calculation_id) {

					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.CREATE_CALCULATION+ '/'+calculation_id+'/motors',
						method: 'POST',
						headers:{
							username: user.username,
							token: user.token
						},
						data:{
							motor:{
								calculation_id:calculation_id,
								name:_calculation.name,
								rated_power:_calculation.rated_power, //potencia
								hours:_calculation.hours,
								days:_calculation.days,
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

				getByCalculation: function(_calculation_id) {
					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + 'api/calculations/'+_calculation_id+'/motors',
						method: 'GET',
						headers:{
							username: user.username,
							token: user.token
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},




			};
		}]);
}).call(this);
