
'use strict';

(function() {
  this.app.service('StorageStatus', ['$q', '$localStorage', function($q, $localStorage) {

    var status;

    return {

      getStatus: function() {
        return status = $localStorage.status;
      },
      setStatus: function(data) {
        $localStorage.status=data;
      },
      destroyStatus: function() {
        delete $localStorage.status;
        return true;
      }
    };

  }]);
}).call(this);
