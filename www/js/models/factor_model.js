
'use strict';

(function() {
	this.app.service('StorageFactorModel', ['$q', '$localStorage', function($q, $localStorage) {

    

		return {

			getFactors: function() {
				return $localStorage.factor;
			},
			setFactors: function(data) {
				$localStorage.factor = data;
			},
			destroyFactor: function() {
				delete $localStorage.factor;
				return true;
			}
		};

	}]);
}).call(this);
