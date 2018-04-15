'use strict';

(function() {
	this.app.factory('$Calculation', ['$http', '$q', 'ENV','StorageUserModel',
		function($http, $q, ENV,StorageUserModel){

			var user = StorageUserModel.getCurrentUser();
			

			return {
				create: function(_data) {
					var defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.CREATE_CALCULATION,
						method: 'POST',
						headers:{
							username:user.username,
							token:user.authentication_token
						},
						data:{
							calculation:_data
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				getByIndex: function(_calculation_id) {
					var defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.INDEX_CALCULATION+_calculation_id,
						method: 'GET',
						headers:{
							username:user.username,
							token:user.authentication_token
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				getAll: function() {
					var defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.INDEX_CALCULATION,
						method: 'GET',
						headers:{
							username:user.username,
							token:user.authentication_token
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				delete: function(_user) {
					var defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.SIGN_UP+'/'+_user.id,
						method: 'DELETE',
						headers:{
							username:user.username,
							token:user.authentication_token
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
