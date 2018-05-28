'use strict';

(function () {
	app.factory('Utils', function (StorageUserModel, $rootScope) {
		// var showingToast = false;

		return {
			validateToast: function (_error) {
				var message = $rootScope.toast[_error] ||  $rootScope.toast.UNKNOWN_ERROR ;

				// if (!showingToast) {
					// showingToast = true;
					$.mdtoast(message, { duration: 4000});
				// }
			}
		};
	});
}).call();
