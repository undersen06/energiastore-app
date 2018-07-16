
'use strict';

(function () {
	this.app.service('StorageCartModel', ['$q', '$localStorage', function ($q, $localStorage) {


		return {

			getCart: function () {
				return $localStorage.product;
			},
			addCart: function (_data) {
				if ($localStorage.product == undefined) {
					$localStorage.product = [];
				}
				$localStorage.product.push(_data);
			},


			findProduct: function (_data) {

				var a;
				if ($localStorage.product != undefined) {
					a = _.find($localStorage.product, { 'sku_name': _data.sku_name });
				}

				return a;
			},

			updateProduct: function () {

			},
			removeFromCart: function (_product) {
				_.remove($localStorage.product, function (n) {
					return n.sku_name == _product.sku_name;
				});

				return $localStorage.product;
			}


		};

	}]);
}).call(this);
