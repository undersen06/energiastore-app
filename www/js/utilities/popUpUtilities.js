'use strict';

(function () {
	this.app.service('popUpService', ['$q', '$ionicPopup', '$rootScope',
		function ($q, $ionicPopup, $rootScope) {


			return {

				showPopUpFailCreateFactor: function (_translation) {
					let deferred = $q.defer();
					let button_exit_lesson = [{
						text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON, type: 'button-afirmative', onTap: function () {
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



				showpopUpProfileFail: function (_translation) {
					let deferred = $q.defer();
					let button_exit_lesson = [{
						text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON, type: 'button-special', onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						title: '<img src="assets/img/error.png" class="img-about-us">',
						template: `<p class="popup-subtitle">${_translation.MODAL_PROFILE_FAIL_BODY}</p>`,
						cssClass: 'successClass',
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},
				showpopUpProfileCreate: function (_translation) {
					let deferred = $q.defer();
					let button_exit_lesson = [{
						text: _translation.MODAL_FAIL_CREATE_FACTOR_BUTTON, type: 'button-special', onTap: function () {
							return true;
						}
					}];


					$ionicPopup.show({
						title: '<img src="assets/img/common/stars.png" class="img-about-us">',
						template: `<p class="popup-subtitle">${_translation.PROFILE_COMPLETED}</p>`,
						cssClass: '',
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},
				showPopupLeaveRegister: function (_translation) {
					let deferred = $q.defer();
					let buttons = [
						{
							text: `${_translation.REGISTER_POPUP_LEAVE_BUTTON}`, type: 'button-special', onTap: function () {
								return 2;
							}
						}, {
							text: `${_translation.REGISTER_POPUP_CONTINUE_BUTTON}`, type: 'button-afirmative', onTap: function () {
								return 1;
							}
						}];

					$ionicPopup.show({
						title: '<img src="assets/img/logout.png" class="img-about-us">',
						template: `<p class="popup-subtitle">${_translation.REGISTER_POPUP_LEAVE_TEXT}</p>`,
						cssClass: '',
						buttons: buttons,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},


				showPopupTokenProblem: function (_translation) {
					let deferred = $q.defer();
					let buttons = [
						{
							text: `${_translation.TOKEN_PROBLEM_BUTTON}`, type: 'button-afirmative', onTap: function () {
								return true;
							}
						}];

					$ionicPopup.show({
						title: '<img src="assets/img/error.png" class="img-about-us">',
						template: `<p class="popup-subtitle">${_translation.TOKEN_PROBLEM_TEXT}</p>`,
						buttons: buttons,
						animation: 'fade-in',
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},

				showPopupOnlyOneProject: function (_translation) {
					let deferred = $q.defer();
					let buttons = [
						{
							text: `${_translation.TOKEN_PROBLEM_BUTTON}`, type: 'button-afirmative', onTap: function () {
								return true;
							}
						}];

					$ionicPopup.show({
						title: '<img src="assets/img/error.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${_translation.WORKING_ON_TITLE}</span>`,
						template: `<p class="popup-subtitle">${_translation.EXPLORER_ONLY_ONE_PROJECT}</p>`,
						buttons: buttons,
						animation: 'fade-in',
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},




				showPopupQuotationOnlyUser: function (_translation) {
					let deferred = $q.defer();
					let buttons = [
						{
							text: `${_translation.OK_BUTTON_QUOTE}`, type: 'button-afirmative', onTap: function () {
								return true;
							}
						}];

					$ionicPopup.show({
						title: '<img src="assets/img/error.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${_translation.WORKING_ON_TITLE}</span>`,
						template: `<p class="popup-subtitle">${_translation.EXPLORER_ONLY_QUOTATIONS}</p>`,
						buttons: buttons,
						animation: 'fade-in',
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},


				showPopUpRegister: function (_translation) {

					let deferred = $q.defer();
					let buttons = [
						{
							text: `${_translation.REGISTER_EXPLORER_BUTTON_NO}`, type: 'button-special', onTap: function () {
								return true;
							}
						}, {
							text: `${_translation.REGISTER_EXPLORER_BUTTON_YES}`, type: 'button-afirmative', onTap: function () {
								return false;
							}
						}];

					$ionicPopup.show({
						title: '<img src=assets/imgcommon/stars.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${_translation.REGISTER_EXPLORER_TITLE}</span>`,
						template: `<p class="popup-subtitle">${_translation.REGISTER_EXPLORER_TEXT}`,
						buttons: buttons,
						animation: 'fade-in'
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},


				showPopUpExitExplorer: function (_translation) {

					let deferred = $q.defer();
					let buttons = [
						{
							text: `${_translation.LOGOUT_EXPLORER_BUTTON_STAY}`, type: 'button-afirmative', onTap: function () {
								return true;
							}
						}, {
							text: `${_translation.LOGOUT_EXPLORER_BUTTON_LEAVE}`, type: 'button-special', onTap: function () {
								return false;
							}
						}];

					$ionicPopup.show({
						title: '<img src=assets/imglogout.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${_translation.LOG_OUT_EXPLORER_TITLE}</span>`,
						template: `<p class="popup-subtitle">${_translation.LOG_OUT_EXPLORER_TEXT}</p>`,
						cssClass: '',
						buttons: buttons,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},

				showpopupCountries: function (_translation) {
					let deferred = $q.defer();
					let button_exit_lesson = [{
						text: 'Re-intentar / Try again', type: 'button-afirmative', onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						title: '<img src="assets/img/error.png" class="img-about-us">',
						subTitle: '<span class="popup-title">Problemas al descargar los paises</span>',
						template: '<p class="popup-subtitle">Problems to download country info.</p>',
						cssClass: '',
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},

				showpopupFacebookEmailError: function (_translation) {
					let deferred = $q.defer();
					let button_exit_lesson = [{
						text: 'Re-intentar / Try again', type: 'button-afirmative', onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						title: '<img src="assets/img/error.png" class="img-about-us">',
						subTitle: '<span class="popup-title">Error</span>',
						template: '<p class="popup-subtitle">Nos es imposible obtener el email desde facebook, registrate de manera manual para poder continuar .</p>',
						cssClass: '',
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;

				},

				showpopupLinkedInRegister: function (_translation) {
					let deferred = $q.defer();
					let button_exit_lesson = [{
						text: 'Entendido', type: 'button-afirmative', onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						title: '<img src="assets/img/error.png" class="img-about-us">',
						subTitle: '<span class="popup-title">Error</span>',
						template: '<p class="popup-subtitle">Para utilizar LinkedIn debe tener previamente la aplicación instalada.</p>',
						cssClass: '',
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;

				},
				workingOnPopUp: function (_translation) {
					let deferred = $q.defer();
					let button_exit_lesson = [{
						text: 'Entendido', type: 'button-afirmative', onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						animation: 'fade-in',
						title: '<img src="assets/img/working-on.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${_translation.WORKING_ON_TITLE}</span>`,
						template: `<p class="popup-subtitle">${_translation.WORKING_ON_TEXT}</p>`,
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;

				},

				errorPopUp: function (_translation) {
					let deferred = $q.defer();
					let button_exit_lesson = [{
						text: 'Entendido', type: 'button-afirmative', onTap: function () {
							return true;
						}
					}];

					$ionicPopup.show({
						animation: 'fade-in',
						title: '<img src="assets/img/working-on.png" class="img-about-us">',
						subTitle: `<span class="popup-title">${_translation.WORKING_ON_TITLE}</span>`,
						template: `<p class="popup-subtitle">${_translation.WORKING_ON_TEXT}</p>`,
						buttons: button_exit_lesson,
					}, null).then(function (_res) {
						deferred.resolve(_res);

					});
					return deferred.promise;
				},


				isWebViewFacebookError: function (_translation) {
					var deferred = $q.defer();
					var button_exit_lesson = [{
						text: 'Entendido', type: 'button-afirmative', onTap: function () {
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
						type: 'button-afirmative',
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
