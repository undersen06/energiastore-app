'use strict';

(function () {
	this.app.factory('$FactorPenalty', ['$http', '$q', 'ENV', 'StorageUserModel',
		function ($http, $q, ENV, StorageUserModel) {

			var user = StorageUserModel.getCurrentUser();

			return {
				create: function (_calculation) {
					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.CREATE_PF_QUOTATION,
						method: 'POST',
						headers: {
							username: user.username,
							token: user.authentication_token
						},
						data: {
							quotation:
								{
									user_id: user.id,
									comment: _calculation.comment,
									reference: _calculation.photo,
									power_factor: _calculation.power_factor
								}
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
