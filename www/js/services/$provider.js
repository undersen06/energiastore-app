'use strict';

(function() {
	this.app.factory('$Providers', ['$http', '$q', 'ENV','StorageUserModel',
		function($http, $q, ENV,StorageUserModel){

			var user = StorageUserModel.getCurrentUser();

			return {
				getProviders: function() {
					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.GET_PROVIDER,
						method: 'GET',
						headers:{
							username:user.username,
							token:user.authentication_token
						},
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
