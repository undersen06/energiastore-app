
'use strict';

(function() {
	this.app.service('StorageStatus', ['$q', '$localStorage', function($q, $localStorage) {

		return {

			getStatus: function() {
				return $localStorage.status;
			},
			setStatus: function(data) {
				$localStorage.status=data;
			},
			destroyStatus: function() {
				delete $localStorage.status;
				return true;
			}
		};

	}]);
}).call(this);
