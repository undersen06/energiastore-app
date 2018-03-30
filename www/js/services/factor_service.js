'use strict';

(function () {
	this.app.factory('$Factor', ['$http', '$q', 'ENV', 'StorageUserModel',
		function ($http, $q, ENV, StorageUserModel) {

			var user = StorageUserModel.getCurrentUser();

			return {
				getAllFactors: function () {

					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + 'api/quotations',
						method: 'GET',
						headers: {
							username: user.username,
							token: user.token
						}
					}).then(function (_response) {
						defer.resolve(_response);

					}, function (_error) {
						defer.reject(_error);
					});
					return defer.promise;
				}


			};
		}]);
}).call(this);
