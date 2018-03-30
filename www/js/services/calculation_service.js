'use strict';

(function() {
	this.app.factory('$Calculation', ['$http', '$q', 'ENV','StorageUserModel',
		function($http, $q, ENV,StorageUserModel){

			var user = StorageUserModel.getCurrentUser();

			return {
				create: function(_data) {
					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.CREATE_CALCULATION,
						method: 'POST',
						headers:{
							username:user.username,
							token:user.token
						},
						data:{
							calculation:{
								name:_data.name,
								energy_cost:_data.price
							}
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				getByIndex: function(_calculation_id) {
					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.INDEX_CALCULATION+_calculation_id,
						method: 'GET',
						headers:{
							username:user.username,
							token:user.token
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				getAll: function() {
					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.INDEX_CALCULATION,
						method: 'GET',
						headers:{
							username:user.username,
							token:user.token
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				delete: function(_user) {
					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.SIGN_UP+'/'+_user.id,
						method: 'DELETE',
						headers:{
							username:user.username,
							token:user.token
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
