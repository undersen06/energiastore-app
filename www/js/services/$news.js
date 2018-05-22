'use strict';

(function () {
	this.app.factory('$News', ['$http', '$q', 'ENV',
		function ($http, $q, ENV) {

			return {

				getNews: function () {
					var defer = $q.defer();
					$http({
						url: ENV.LOCAL + 'api/news',
						method: 'GET',
					}).then(function (_response) {
						defer.resolve(_response);

					}, function (_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},




			};
		}
	]);
}).call(this);