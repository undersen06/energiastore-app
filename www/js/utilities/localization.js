'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/

this.app.service('$Localization',
	function($resource,StorageLanguageModel,$rootScope) {

		return{
			getTranslation:function(){
				$resource('js/config/location/'+StorageLanguageModel.getCurrentLanguage()+'.json').get(function (data) {

					// Views
					$rootScope.login =  data.VIEWS.LOGIN;
					$rootScope.dashboard =  data.VIEWS.DASHBOARD;
					$rootScope.factor_mp =  data.VIEWS.FACTOR_MP;
					$rootScope.introduction =  data.VIEWS.INTRODUCTION;
					$rootScope.middleware =  data.VIEWS.MIDDLEWARE;
					$rootScope.motors =  data.VIEWS.MOTORS;
					$rootScope.products =  data.VIEWS.PRODUCTS;
					$rootScope.projects =  data.VIEWS.PROJECTS;
					$rootScope.quotation =  data.VIEWS.QUOTATION;
					$rootScope.register =  data.VIEWS.REGISTER;
					$rootScope.settings =  data.VIEWS.SETTINGS;
					$rootScope.welcome =  data.VIEWS.WELCOME;
					$rootScope.footbar =  data.VIEWS.FOOTBAR;

					// Toast
					$rootScope.toast =  data.TOAST;
					$rootScope.popup =  data.POPUP;



					
				});
			}
		};


	});
