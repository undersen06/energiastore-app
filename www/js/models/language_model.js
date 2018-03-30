
'use strict';

(function() {
	this.app.service('StorageLanguageModel', ['$q', '$localStorage', function($q, $localStorage) {

  
		return {

			getCurrentLanguage: function() {
				return $localStorage.language;
			},
			setCurrentLanguage: function(data) {
				$localStorage.language = data;
			},
			destroyCurrentLanguage: function() {
				delete $localStorage.language;
				return true;
			}
		};

	}]);
}).call(this);
