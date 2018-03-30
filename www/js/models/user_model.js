
'use strict';

(function() {
	this.app.service('StorageUserModel', ['$q', '$localStorage', function($q, $localStorage) {

		return {

			getCurrentUser: function() {
				return $localStorage.user;
			},
			setCurrentUser: function(data) {
				$localStorage.user = data;
			},
			destroyCurrentUser: function() {

				delete $localStorage.user;
				return true;
			}
		};

	}]);
}).call(this);
