'use strict';

(function() {
	this.app.factory('$User', ['$http', '$q', 'ENV','StorageUserModel','StorageCountryModel',
		function($http, $q, ENV, StorageUserModel,StorageCountryModel){

			var user = StorageUserModel.getCurrentUser();

			return {
				registerUser: function(_user) {
					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.SIGN_UP,
						method: 'POST',
						data:{
							user:{
								username:_user.email,
								password:_user.password,
								password_confirmation:_user.password_confirmation
							}
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				registerUserFacebook: function(_facebook_data) {
					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.SIGN_UP,
						method: 'POST',
						data:{
							user:{
								username:_facebook_data,
								password:'asdfg',
								password_confirmation:'asdfg',
								type:'facebook'
							}
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				registerUserLinkedin: function(_linkedin_data) {
					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.SIGN_UP,
						method: 'POST',
						data:{
							user:{
								username:_linkedin_data,
								password:'asdfg',
								password_confirmation:'asdfg',
								type:'linkedin'
							}
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				updateUser: function(_user,_info) {

					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.UPDATE_USER_API+_user.id,
						method: 'PATCH',
						headers:{
							username: user.username,
							token: user.tokauthentication_tokenen
						},
						data:{
							user:{
								email:_user.username,
								phone:_info.phone,
								address:_info.address,
								name:_info.name,
								last_name:_info.last_name,
								city:_info.city,
								country:StorageCountryModel.getSelectedCountry().name
							}
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},


				updateCountry: function(_user,_country) {
					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.UPDATE_USER_API+_user.id,
						method: 'PATCH',
						headers:{
							username:_user.username,
							token:_user.authentication_token
						},
						data:{
							user:{
								country :_country
							}
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						var error ={
							INTERNAL_CODE:_error,
							USER_ERROR_CODE: 'UPDATE_COUNTRY'
						};
						defer.reject(error);
					});
					return defer.promise;
				},

				registerUserFacebookInfo: function(_user,_info) {

					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.UPDATE_USER_API+_user.id,
						method: 'PATCH',
						headers:{
							username:_user.username,
							token:_user.authentication_token
						},
						data:{
							user:{
								email:_info.email,
								name:_info.name,
								last_name:'',
								country:StorageCountryModel.getSelectedCountry().name
								// country:_info.country
							}
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				registerUserLinkedInInfo: function(_user,_info) {
					
					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.UPDATE_USER_API+_user.id,
						method: 'PATCH',
						headers:{
							username:_user.username,
							token:_user.authentication_token
						},
						data:{
							user:{
								email:_info.email,
								name:_info.name,
								last_name:_info.last_name,
								country :StorageCountryModel.getSelectedCountry().name
							}
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;
				},

				getAvatars : function(){

					let defer = $q.defer();
					$http({
						url: ENV.LOCAL + ENV.AVATAR,
						method: 'PATCH',
						headers:{
							username:user.username,
							token:user.authentication_token
						}
					}).then(function(_response) {
						defer.resolve(_response);

					}, function(_error) {
						defer.reject(_error);
					});
					return defer.promise;

				}



			};
		}]);
}).call(this);
