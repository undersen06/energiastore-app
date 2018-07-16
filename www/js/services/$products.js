'use strict';

(function () {
	this.app.factory('$Products', ['$http', '$q', 'ENV', 'StorageUserModel',
		function ($http, $q, ENV, StorageUserModel) {

			var user = StorageUserModel.getCurrentUser();

			return {
				getCategories: function () {
					var defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.GET_CATEGORIES,
						method: 'GET',
						headers: {
							username: user.username,
							token: user.authentication_token
						},
					}).then(function (_response) {
						defer.resolve(_response);

					}, function (_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},
				getProductByCategory: function (_id) {
					var defer = $q.defer();
					$http({
						url: `${ENV.LOCAL}api/products/by_category?category_id=${_id}`,
						method: 'GET',
						headers: {
							username: user.username,
							token: user.authentication_token
						},
					}).then(function (_response) {
						defer.resolve(_response);

					}, function (_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				getProductsQuotation: function (_id) {
					var defer = $q.defer();
					$http({
						url: `${ENV.LOCAL}api/products/per_user`,
						method: 'GET',
						headers: {
							username: user.username,
							token: user.authentication_token
						},
					}).then(function (_response) {
						defer.resolve(_response);

					}, function (_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				getProductsQuotationByStatus: function (_status) {
					var defer = $q.defer();
					$http({
						url: `${ENV.LOCAL}api/products/per_user`,
						method: 'GET',
						headers: {
							username: user.username,
							token: user.authentication_token
						},
						params:{
							status:_status
						}
					}).then(function (_response) {
						defer.resolve(_response);

					}, function (_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				getAllProducts: function (_status) {
					var defer = $q.defer();
					$http({
						url: `${ENV.LOCAL}api/products`,
						method: 'GET',
						headers: {
							username: user.username,
							token: user.authentication_token
						},
						params:{
							status:_status
						}
					}).then(function (_response) {
						defer.resolve(_response);

					}, function (_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				getProduct: function (_productId) {
					var defer = $q.defer();
					$http({
						url: `${ENV.LOCAL}api/products/${_productId}`,
						method: 'GET',
						headers: {
							username: user.username,
							token: user.authentication_token
						},
					}).then(function (_response) {
						defer.resolve(_response);

					}, function (_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				getProductImages: function (_productId) {
					var defer = $q.defer();
					$http({
						url: `${ENV.LOCAL}api/product_images/per_product`,
						method: 'GET',
						headers: {
							username: user.username,
							token: user.authentication_token
						},
						params:{
							product_id:_productId
						}
					}).then(function (_response) {
						defer.resolve(_response);

					}, function (_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				getProductSheet: function (_productId) {
					var defer = $q.defer();
					$http({
						url: `${ENV.LOCAL}api/product_sheets/per_product`,
						method: 'GET',
						headers: {
							username: user.username,
							token: user.authentication_token
						},
						params:{
							product_id:_productId
						}
					}).then(function (_response) {
						defer.resolve(_response);

					}, function (_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},





			};
		}
	]);
}).call(this);