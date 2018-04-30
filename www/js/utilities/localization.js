'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/

this.app.service('$Localization',
	function ($resource, StorageLanguageModel, $rootScope) {

		return {
			getTranslation: function () {
				if (StorageLanguageModel.getCurrentLanguage() != undefined) {
					$resource('js/config/location/' + StorageLanguageModel.getCurrentLanguage() + '.json').get(function (data) {

						// Views
						$rootScope.login = data.VIEWS.LOGIN;
						$rootScope.dashboard = data.VIEWS.DASHBOARD;
						$rootScope.factor = data.VIEWS.FACTOR_MP;
						$rootScope.introduction = data.VIEWS.INTRODUCTION;
						$rootScope.middleware = data.VIEWS.MIDDLEWARE;
						$rootScope.motors_t = data.VIEWS.MOTORS;
						$rootScope.products = data.VIEWS.PRODUCTS;
						$rootScope.project = data.VIEWS.PROJECT;
						$rootScope.quotation = data.VIEWS.QUOTATION;
						$rootScope.finish_quotation = data.VIEWS.QUOTATION.FINALIZE;
						$rootScope.register = data.VIEWS.REGISTER;
						$rootScope.settings = data.VIEWS.SETTINGS;
						$rootScope.tutorials = data.VIEWS.SETTINGS.OPTIONS.TUTORIAL;
						$rootScope.profile = data.VIEWS.SETTINGS.OPTIONS.PROFILE;
						$rootScope.welcome = data.VIEWS.WELCOME;
						$rootScope.footbar = data.VIEWS.FOOTBAR;
						$rootScope.app = data.APP;

						// Toast
						$rootScope.toast = data.TOAST;
						$rootScope.popup = data.POPUP;

						


					});
				}
			}
		};


	});