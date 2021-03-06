'use strict';
/*
=========================================
ROUTES CONFIGURATION
=========================================
*/

(function () {
	this.app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {


		// $ionicConfigProvider.navBar.alignTitle('center');
		// $ionicConfigProvider.tabs.position('bottom');
		//
		// $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);
		// $ionicConfigProvider.views.transition('none');
		// $ionicConfigProvider.views.swipeBackEnabled(false);



		$ionicConfigProvider.tabs.position('bottom');
		$ionicConfigProvider.navBar.alignTitle('center');
		$ionicConfigProvider.backButton.previousTitleText(true).text('&emsp;&emsp;');
		$ionicConfigProvider.scrolling.jsScrolling(false);
		$ionicConfigProvider.backButton.previousTitleText(false).text('&emsp;&emsp;');
		$ionicConfigProvider.views.transition('none');
		$ionicConfigProvider.platform.android.scrolling.jsScrolling(false);
		$ionicConfigProvider.views.swipeBackEnabled(false);

		// $httpProvider.defaults.headers.put["Content-Type"] = "application/json; charset=UTF-8";
		// $httpProvider.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
		// $httpProvider.defaults.headers.patch["Content-Type"] = "application/json; charset=UTF-8";


		// $stateProvider

		$stateProvider


			.state('welcome', {
				url: '/welcome',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/welcome/welcome.html',
				controller: 'WelcomeController'
			})

			.state('introduction', {
				url: '/introduction',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/introduction/introduction.html',
				controller: 'IntroductionController'
			})

			.state('middleware', {
				url: '/middleware',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/middleware/middleware.html',
				controller: 'MiddlewareController'
			})


			.state('tutorialTypeUser', {
				url: '/tutorials/type_user/:flag',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/settings/options/tutorials/tutorials/type_user/tutorial.html',
				controller: 'TutorialTypeUserController'
			})


			.state('tutorialFactor', {
				url: '/tutorials/factor/:flag',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/settings/options/tutorials/tutorials/penalty/tutorial.html',
				controller: 'TutorialPenaltyController'
			})
			.state('login', {
				url: '/login',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/login/login.html',
				controller: 'LoginController'
			})
			.state('register', {
				url: '/register',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/register/register.html',
				controller: 'RegisterController'
			})
			.state('dashboard', {
				url: '/dashboard/:options',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/dashboard/dashboard.html',
				controller: 'DashboardController'
			})
			.state('settings', {
				url: '/settings',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/settings/settings.html',
				controller: 'SettingsController'
			})
			.state('project', {
				url: '/projects',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/project/project.html',
				controller: 'ProjectController'
			})
			.state('quotation', {
				url: '/quotation',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/quotation/quotation.html',
				controller: 'QuotationController'
			})
			.state('factor', {
				url: '/factor',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/factormp/factor.html',
				controller: 'FactorController'
			})

			.state('profile', {
				url: '/profile',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/settings/options/profile/profile.html',
				controller: 'ProfileController'
			})

			.state('motors', {
				url: '/quotation/:id_quotation/motors/:project_name',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/motors/motor.html',
				controller: 'MotorsController'
			})

			.state('finalizeQuotation', {
				url: '/quotation/:id_quotation/motors/finalize',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/quotation/finalize/quotation.html',
				controller: 'FinalizedQuotationController'
			})

			.state('createFactor', {
				url: '/factor',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/factormp/factor.html',
				controller: 'FactorController'
			})

			.state('tutorials', {
				url: '/tutorials',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/settings/options/tutorials/tutorials.html',
				controller: 'TutorialsController'
			})
			.state('categories', {
				url: '/categories',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/commerce/categories/categories.html',
				controller: 'CategoriesController'
			})

			.state('products', {
				url: '/categories/:category_id/products',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/commerce/products/products.html',
				controller: 'ProductsController'
			})

			.state('product', {
				url: '/categories/:category_id/product/:product_id',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/commerce/product/product.html',
				controller: 'ProductController'
			})

			.state('cart', {
				url: '/cart',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/commerce/cart/cart.html',
				controller: 'CartController'
			})

			.state('news', {
				url: '/news/',
				cache: false,
				abstract: false,
				templateUrl: 'js/views/news/news.html',
				controller: 'NewsController'
			});


		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('welcome');

	});
}).call(this);