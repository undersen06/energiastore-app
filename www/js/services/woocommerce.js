'use strict';

(function() {
	this.app.factory('$Woocommerce', ['$http', '$q', 'ENV','StorageUserModel','WC',
		function($http, $q, ENV, StorageUserService,WC){

			var Woocommerce = WC.WC();


			return {
				getAllCategories: function(index) {
					let defer = $q.defer();
					Woocommerce.get('products/categories?page='+index, function(err, data, res){
						if(!err){
							defer.resolve(JSON.parse(res));
						}else{
							defer.reject(JSON.parse(err));
						}

					});
					return defer.promise;
				},

				getProductsByCategory: function(index) {
					let defer = $q.defer();
					Woocommerce.get('products?category='+index, function(err, data, res){
						if(!err){
							defer.resolve(JSON.parse(res));
						}else{
							defer.reject(JSON.parse(err));
						}

					});
					return defer.promise;
				},

				getProductsByid: function(index) {
					let defer = $q.defer();
					Woocommerce.get('products/'+index, function(err, data, res){
						if(!err){
							defer.resolve(JSON.parse(res));
						}else{
							defer.reject(JSON.parse(err));
						}

					});
					return defer.promise;
				}


			};
		}]);
}).call(this);
