
'use strict';


//    "MODAL_CREATE_FACTOR_BUTTON": "Entendido",
// "MODAL_CREATE_FACTOR_TEXT": "Cotización realizada de manera exitosa, EnergiaStore se pondrá en contacto con usted para enviar su cotización.",

// "MODAL_FAIL_CREATE_FACTOR_TEXT": "Ups no hemos podido realizar tu cotización, por favor intentalo mas tarde.",

(function() {
	this.app.constant('ENV', {

		//****************+SERVERS**************//

		
		LOCAL : 'http://energiastoreapp.com/',

	
		

		//**************+End-Points**************//
		// SESSION_MODEL
		SIGN_UP : 'api/signup',
		SIGN_IN : 'api/login',
		LOG_OUT : 'api/logout',

		// USER_MODEL
		UPDATE_USER_API : 'api/users/',


		//CALCULATIONS_MODEL
		CREATE_CALCULATION: 'api/calculations',
		SHOW_CALCULATION: 'api/calculations/',
		INDEX_CALCULATION: 'api/calculations/',
		// INDEX_MOTORS_BY_CALCULATION: "api/calculations/",
		DESTROY_CALCULATION: 'api/calculations',

		CREATE_PF_QUOTATION : 'api/pf_quotation',

		GET_COUNTRIES : 'api/countries',
		GET_CURRENCIES : 'api/currencies',
		GET_AVATARS : 'api/avatars',
		GET_PROVIDER: 'api/providers'


	});
}).call(this);
