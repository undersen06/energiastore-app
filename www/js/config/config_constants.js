
'use strict';

(function() {
	this.app.constant('ENV', {


		//////////////////////////////////////////
		//****************+SERVERS**************//
		//////////////////////////////////////////

<<<<<<< HEAD
    LOCAL: "http://energiastoreapp.com/",
    //  LOCAL : "http://localhost:3000/",
=======
		LOCAL : 'http://kvar.herokuapp.com/',
		
>>>>>>> 82f1d7d799c54f28680a349e15bb2efa645f6abc


		//////////////////////////////////////////
		//**************+EndPoinst**************//
		//////////////////////////////////////////

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

		CREATE_PF_QUOATATION : 'api/pf_quotation',

		GET_COUNTRIES : 'api/countries',
		GET_CURRENCIES : 'api/currencies'






	});
}).call(this);
