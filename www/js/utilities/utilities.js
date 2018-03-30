'use strict';

(function () {
	app.factory('Utils', function (StorageUserModel, $rootScope) {
		var showingToast = false;

		return {
			validateToast: function (_views, _error) {
				var message = $rootScope.toast.UNKNOW_ERROR;

				if(_error != undefined && _views != undefined){
					message = $rootScope.toast[_views][_error];
				}

				if (!showingToast) {
					showingToast = true;
					Materialize.toast(message, 4000, '', function () {
						showingToast = false;
					});
				}
			},
			designColors: function () {
				var design = {};
				if (StorageUserModel.getCurrentUser() != undefined) {
					switch (StorageUserModel.getCurrentUser().type_user) {
						case 'user':
							design.header = 'user-color';
							design.color = 'user-color-font';
							break;

						case 'partner':
							design.header = 'partner-color';
							design.color = 'partner-color-font';
							break;

						case 'explorer':
							design.header = 'explorer-color';
							design.color = 'explorer-color-font';
							break;
						default:
							design.header = 'user-color';
							design.color = 'user-color-font';
							break;
					}
				} else {

					design.header = 'user-color';
					design.color = 'user-color-font';
				}

				return design;
			}

		};
	});
}).call();
