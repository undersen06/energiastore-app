'use strict';

(function () {
	app.factory('Utils', function (StorageUserModel, $rootScope) {
		var showingToast = false;

		return {
			validateToast: function (_views, _error) {
				var message = $rootScope.toast.UNKNOWN_ERROR;

				if (_error != undefined && _views != undefined) {
					message = $rootScope.toast[_views][_error];
				}

				if (!showingToast) {
					showingToast = true;
					Materialize.toast(message, 4000, '', function () {
						showingToast = false;
					});
				}
			}
		};
	});
}).call();
