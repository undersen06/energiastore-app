'use strict';

(function () {
	app.factory('Utils', function (StorageUserModel, $rootScope) {
		var showingToast = false;

		return {
			validateToast: function (_error) {
				var message = $rootScope.toast[_error] ||  $rootScope.toast.UNKNOWN_ERROR ;

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
