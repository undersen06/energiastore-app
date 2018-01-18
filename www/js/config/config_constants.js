
'use strict';

(function() {
  this.app.constant("ENV", {


    //////////////////////////////////////////
    //****************+SERVERS**************//
    //////////////////////////////////////////

    LOCAL : "http://kvar.herokuapp.com/",
    //  LOCAL : "http://localhost:3000/",


    //////////////////////////////////////////
    //**************+EndPoinst**************//
    //////////////////////////////////////////

    // SESSION_MODEL
    SIGN_UP : "api/signup",
    SIGN_IN : "api/login",
    LOG_OUT : "api/logout",

    // USER_MODEL
    UPDATE_USER_API : "api/users/",


    //CALCULATIONS_MODEL
    CREATE_CALCULATION: "api/calculations",
    SHOW_CALCULATION: "api/calculations/",
    INDEX_CALCULATION: "api/calculations/",
    // INDEX_MOTORS_BY_CALCULATION: "api/calculations/",
    DESTROY_CALCULATION: "api/calculations",

    CREATE_PF_QUOATATION : "api/pf_quotation"






  })
}).call(this);
