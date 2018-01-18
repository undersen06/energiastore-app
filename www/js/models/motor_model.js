
'use strict';

(function() {
  this.app.service('StorageMotor', ['$q', '$localStorage', function($q, $localStorage) {

    var motor;

    return {

      getMotor: function() {
        return motor = $localStorage.motor;
      },
      addMotor: function(data) {
        $localStorage.motor=data;
      },
      destroyMotors: function() {
        delete $localStorage.motor;
        return true;
      }
    };

  }]);
}).call(this);
