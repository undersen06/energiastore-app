
'use strict';

(function() {
	this.app.service('StorageCountryModel', ['$q', '$localStorage', function($q, $localStorage) {


		return {
			getCurrentCountry: function() {
				return $localStorage.country;
			},

			setCurrentCountry: function(data) {
				$localStorage.country = data;
			},

			destroyCurrentCountry: function() {
				delete $localStorage.country;
				return true;
			},

			getCurrencies: function() {
				return $localStorage.currency;
			},

			setCurrencies: function(data) {
				$localStorage.currency = data;
			},

			destroyCurrencies: function() {
				delete $localStorage.currency;
				return true;
			},

			selectCountry: function(_data) {
				$localStorage.selectedCountry = _data;
			},

			getSelectedCountry: function() {
				return $localStorage.selectedCountry;
			},

			getSelectedCurrency: function() {
				return  $localStorage.selectedCurrency;
			},

			selectCurrency: function(_data) {
				$localStorage.selectedCurrency = _data;
			}
		};

	}]);
}).call(this);
