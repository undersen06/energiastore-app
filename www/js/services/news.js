'use strict';

(function () {
	this.app.factory('$News', ['$http', '$q', 'ENV',
		function ($http, $q, ENV, StorageUserService) {


			return {
				getNews: function () {
					let defer = $q.defer();
					$http({
						url: '',
						method: 'GET'
					}).then(function (_response) {
						defer.resolve(_response);

					}, function (_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

              
			};
		}]);
}).call(this);
