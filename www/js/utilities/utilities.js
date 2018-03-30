'use strict';

(function () {
	app.factory('Utils', [function () {
		var showingToast = false;

		return {
			validateToast: function validateToast(message) {
				if (!showingToast) {
					showingToast = true;
					this.Materialize.toast(message, 4000, '', function () {
						showingToast = false;
					});
				}
			},

			isWebView: function () {
				return this.platform.is('core') || this.platform.is('mobileweb');
					
			}

		};
	}]);
}).call();
