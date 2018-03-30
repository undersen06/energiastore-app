
'use strict';

(function() {
	this.app.service('WC', function(){
		return {
			WC: function(){
				var Woocommerce = new WoocommerceAPI({
					url: 'http://energiastore.com',
					consumerKey: 'ck_3abbce38fedef2e2bb233507519ce26283ce02cc',
					consumerSecret: 'cs_a87b005c37bcc6d45d3cd9cbc10b6592ead6bcba',
					wpAPI: true, //or false if you want to use the legacy API v3
					version: 'wc/v1' //or wc/v1
				});
				return Woocommerce;
			}
		};});
}).call(this);
