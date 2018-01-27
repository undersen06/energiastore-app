'use strict';

(function() {
  this.app.component('footbar', {
     templateUrl: "components/footbar/footbar.html",
      controller: function ($scope,$state) {

        $scope.goToDashboard = function(){
          $state.go("dashboard");
        }

        $scope.goToProjects = function(){
          $state.go("project");
        }

        $scope.goToQuotes = function(){
          $state.go("quotation")
        }


      }
  });
}).call(this);
