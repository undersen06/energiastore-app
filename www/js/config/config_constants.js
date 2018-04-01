
'use strict';

(function() {
	this.app.constant('ENV', {

		//****************+SERVERS**************//

		LOCAL : 'http://kvar.herokuapp.com/',
	
		

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
		GET_AVATARS : 'api/avatars'


	});
}).call(this);
