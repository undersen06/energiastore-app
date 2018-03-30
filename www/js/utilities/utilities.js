'use strict';

(function () {
	this.app.factory('Utils', [function () {

		var showingToast = false;

		return {
			validateToast: function validateToast(message) {
				if (showingToast === false) {
					showingToast = true;
					this.Materialize.toast(message, 4000, '', function () {
						showingToast = false;
					});
				}
			}
		};
	}]);
}).call();
