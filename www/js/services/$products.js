'use strict';

(function () {
	this.app.factory('$Products', ['$http', '$q', 'ENV', 'StorageUserModel',
		function ($http, $q, ENV, StorageUserModel) {

			var user = StorageUserModel.getCurrentUser();

			return {
				getCategories: function () {
					var defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.GET_CATEGORIES,
						method: 'GET',
						headers: {
							username: user.username,
							token: user.authentication_token
						},
					}).then(function (_response) {
						defer.resolve(_response);

					}, function (_error) {
						defer.reject(_error);
					});
					return defer.promise;
				}

			};
		}
	]);
}).call(this);