'use strict';

(function () {
	this.app.service('popUpService', ['$q', '$ionicPopup', '$rootScope',
		function ($q, $ionicPopup, $rootScope) {


			return {

				showPopUpFailCreateFactor: function (_translation) {
					var deferred = $q.defer();
					var button_exit_lesson = [{
						text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON, type: 'button-affirmative', onTap: function () {
							return true;
						}
					}];

					

					$ionicPopup.show({
						title: '<img src="assets/img/error.png" class="img-about-us">',
						template: `<p class="popup-subtitle">${_translation.MODAL_FAIL_CREATE_FACTOR_TEXT}</p>`,
						cssClass: '',
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},



				showPopUpProfileFail: function () {
					var deferred = $q.defer();
					var button_exit_lesson = [{
						text: $rootScope.popup.UPDATE_PROFILE_ERROR.BUTTON.POSITIVE, type: 'button-special', onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						title: '<img src="assets/img/error.png" class="img-about-us">',
						template: `<p class="popup-subtitle">${$rootScope.popup.UPDATE_PROFILE_ERROR.BODY}</p>`,
						cssClass: 'successClass',
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},

				showPopUpProfileCreate: function () {

					
					var deferred = $q.defer();
					var button_exit_lesson = [{
						text: $rootScope.popup.UPDATE_PROFILE_SUCCESS.BUTTON.POSITIVE, type: 'button-special', onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						title: '<img src="assets/img/common/stars.png" class="img-about-us">',
						template: `<p class="popup-subtitle">${$rootScope.popup.UPDATE_PROFILE_SUCCESS.BODY}</p>`,
						cssClass: '',
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},

				showPopupLeaveRegister: function () {
					var deferred = $q.defer();
					var buttons = [
						{
							text: $rootScope.popup.LEAVE_SIGN_UP.BUTTON.NEGATIVE, type: 'button-special', onTap: function () {
								return 2;
							}
						}, {
							text: $rootScope.popup.LEAVE_SIGN_UP.BUTTON.POSITIVE, type: 'button-affirmative', onTap: function () {
								return 1;
							}
						}];

					
					$ionicPopup.show({
						title: '<img src="assets/img/logout.png" class="img-about-us">',
						template: `<p class="popup-subtitle">${$rootScope.popup.LEAVE_SIGN_UP.BODY}</p>`,
						cssClass: '',
						buttons: buttons,
					}, null).then(function (_res) {
						deferred.resolve(_res);
					});
					return deferred.promise;
				},


				showPopupTokenProblem: function () {
					var deferred = $q.defer();
					var buttons = [
						{
							text: $rootScope.popup.TOKEN_PROBLEM.BUTTON.POSITIVE, type: 'button-affirmative', onTap: function () {
								return true;
							}
						}];
					
					$ionicPopup.show({
						title: '<img src="assets/img/error.png" class="img-about-us">',
						template: `<p class="popup-subtitle">${$rootScope.popup.TOKEN_PROBLEM.BODY}</p>`,
						buttons: buttons,
						animation: 'fade-in',
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},

				showPopupCountries: function () {
					var deferred = $q.defer();
					var button_exit_lesson = [{
						text: 'Re-intentar / Try again', type: 'button-affirmative', onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						title: '<img src="assets/img/error.png" class="img-about-us">',
						subTitle: '<span class="popup-title">Problemas al descargar los países</span>',
						template: '<p class="popup-subtitle">Problems to download country info.</p>',
						cssClass: '',
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},

				showPopupFacebookEmailError: function () {
					var deferred = $q.defer();
					var button_exit_lesson = [{
						text: $rootScope.popup.FACEBOOK_EMAIL_ERROR.BUTTON.POSITIVE, type: 'button-affirmative', onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						title: '<img src="assets/img/error.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${$rootScope.popup.FACEBOOK_EMAIL_ERROR.TITLE}</span>`,
						template: `<p class="popup-subtitle">${$rootScope.popup.FACEBOOK_EMAIL_ERROR.BODY}</p>`,
						cssClass: '',
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;

				},

				workingOnPopUp: function (){
					var deferred = $q.defer();
					var button_exit_lesson = [{
						text: $rootScope.popup.WORKING_ON.BUTTON.POSITIVE, type: 'button-affirmative', onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						animation: 'fade-in',
						title: '<img src="assets/img/working-on.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${$rootScope.popup.WORKING_ON.TITLE}</span>`,
						template: `<p class="popup-subtitle">${$rootScope.popup.WORKING_ON.BODY}</p>`,
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},

				isWebViewFacebookError: function (_translation) {
					var deferred = $q.defer();
					var button_exit_lesson = [{
						text: 'Entendido', type: 'button-affirmative', onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						animation: 'fade-in',
						title: '<img src="assets/img/facebook.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${_translation.WORKING_ON_TITLE}</span>`,
						template: `<p class="popup-subtitle">${_translation.WORKING_ON_TEXT}</p>`,
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;

				},

				isWebViewLinkedInError: function (_error) {
					var message = $rootScope.popup.ERROR_LINKEDIN_LOGIN;
					if(_error !== undefined){
						message = $rootScope.popup[_error];
					}
					

					var deferred = $q.defer();
					var button_exit_lesson = [{
						text: message.BUTTON.POSITIVE,
						type: 'button-affirmative',
						onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						animation: 'fade-in',
						title: '<img src="assets/img/linkedin.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${message.TITLE || ''}</span>`,
						template: `<p class="popup-subtitle">${message.BODY || ''}</p>`,
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				}
			};

		}]);

}).call(this);
