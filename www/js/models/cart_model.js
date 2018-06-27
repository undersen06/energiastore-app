
'use strict';

(function() {
	this.app.service('StorageCartModel', ['$q', '$localStorage', function($q, $localStorage) {


		return {

			getCart : function(){
				return $localStorage.country;
			},
			addCart: function(_data){
				if($localStorage.currency == undefined){
					$localStorage.currency =[];
				}
				$localStorage.currency.push(_data);
			},
		};

	}]);
}).call(this);
