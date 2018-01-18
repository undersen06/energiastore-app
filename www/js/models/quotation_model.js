
'use strict';

(function() {
  this.app.service('StorageQuotation', ['$q', '$localStorage', function($q, $localStorage) {

    var quotation;

    return {

      getQuotations: function() {
        return quotation = $localStorage.quotation;
      },
      setQuotation: function(data) {

        $localStorage.quotation=data;
      },
      destroyQuotation: function() {
        delete $localStorage.quotation;
        return true;
      }
    };

  }]);
}).call(this);
