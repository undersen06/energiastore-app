
'use strict';

(function() {
  this.app.service('StorageLanguageModel', ['$q', '$localStorage', function($q, $localStorage) {

    let language;

    return {

      getCurrentLanguage: function() {
        return language = $localStorage.language;
      },
        setCurrentLanguage: function(data) {
        $localStorage.language = data;
      },
        destroyCurrentLanguage: function() {
        delete $localStorage.language;
        return true;
      }
    };

  }]);
}).call(this);
