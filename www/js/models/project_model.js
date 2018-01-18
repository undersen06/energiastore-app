
'use strict';

(function() {
  this.app.service('StorageProject', ['$q', '$localStorage', function($q, $localStorage) {

    var project;

    return {

      getProjects: function() {
        return project = $localStorage.project;
      },
      addProjects: function(data) {
        $localStorage.project=data;
      },
      destroyProjects: function() {
        delete $localStorage.project;
        return true;
      }
    };

  }]);
}).call(this);
