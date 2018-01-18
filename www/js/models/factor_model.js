
'use strict';

(function() {
  this.app.service('StorageFactorModel', ['$q', '$localStorage', function($q, $localStorage) {

    let factor;

    return {

      getFactors: function() {
        return factor = $localStorage.factor;
      },
        setFactors: function(data) {
        $localStorage.factor = data;
      },
        destroyFactor: function() {
        delete $localStorage.factor;
        return true;
      }
    };

  }]);
}).call(this);
