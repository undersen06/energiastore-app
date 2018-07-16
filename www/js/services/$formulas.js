'use strict';

(function () {
	this.app.factory('$Formulas', ['$http', '$q', 'ENV', 'StorageUserModel',
		function ($http, $q, ENV, StorageUserModel) {

			var user = StorageUserModel.getCurrentUser();

			return {
				getFormulas: function () {

					var defer = $q.defer();
					$http({
						url: ENV.LOCAL + 'api/formulas',
						method: 'GET',
						headers: {
							username: user.username,
							token: user.authentication_token
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
